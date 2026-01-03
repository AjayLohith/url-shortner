package com.ajay.urlshortnerapp.service;

import com.ajay.urlshortnerapp.model.Url;
import com.ajay.urlshortnerapp.repository.UrlRepository;
import com.ajay.urlshortnerapp.util.ShortCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.weaving.LoadTimeWeaverAware;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository repository;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String CACHE_PREFIX = "shorturl:";
    private final LoadTimeWeaverAware loadTimeWeaverAware;

    public ResponseEntity<String> shortenUrl(String originalUrl) {

        // 1️⃣ Save URL (get ID)
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url = repository.save(url);

        // 2️⃣ Generate short code
        String shortCode = ShortCodeGenerator.generate(url.getId());
        url.setShortUrl(shortCode);
        repository.save(url);

        // 3️⃣ Cache (best-effort)
        try {
            redisTemplate.opsForValue()
                    .set(CACHE_PREFIX + shortCode, originalUrl, Duration.ofHours(24));
        } catch (Exception e) {
            // Redis failure should NOT break app
        }
        return ResponseEntity.ok(shortCode);
    }

    public ResponseEntity<Void> getOriginalUrl(String code) {

        String cacheKey = CACHE_PREFIX + code;
        long start = System.nanoTime();

        // 1️⃣ Try Redis
        try {
            long redisStart = System.nanoTime();
            String cachedUrl = redisTemplate.opsForValue().get(cacheKey);
            long redisEnd = System.nanoTime();

            System.out.println(
                    "REDIS lookup took " + (redisEnd - redisStart) / 1_000_000 + " ms"
            );

            if (cachedUrl != null) {
                long total = System.nanoTime();
                System.out.println(
                        "🔥 REDIS HIT | Total latency = " + (total - start) / 1_000_000 + " ms"
                );

                return ResponseEntity.status(302)
                        .header("Location", cachedUrl)
                        .build();
            }

            System.out.println("🟡 REDIS MISS");

        } catch (Exception e) {
            System.out.println("⚠️ REDIS ERROR | fallback to DB");
        }

        // 2️⃣ DB fallback
        long dbStart = System.nanoTime();
        Url url = repository.findByShortUrl(code)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));
        long dbEnd = System.nanoTime();

        System.out.println(
                "DB lookup took " + (dbEnd - dbStart) / 1_000_000 + " ms"
        );

        long total = System.nanoTime();
        System.out.println(
                "🧠 TOTAL latency = " + (total - start) / 1_000_000 + " ms"
        );

        return ResponseEntity.status(302)
                .header("Location", url.getOriginalUrl())
                .build();
    }

}
