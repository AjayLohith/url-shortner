package com.ajay.urlshortnerapp.service;

import com.ajay.urlshortnerapp.model.Url;
import com.ajay.urlshortnerapp.repository.UrlRepository;
import com.ajay.urlshortnerapp.util.ShortCodeGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository repository;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String CACHE_PREFIX = "shorturl:";

    public String shorten(String originalUrl, String customSlug) {

        if (customSlug != null && !customSlug.isBlank()) {
            String slug = customSlug.trim();

            if (repository.existsByShortUrl(slug)) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Custom slug already exists"
                );
            }

            Url url = new Url();
            url.setOriginalUrl(originalUrl);
            url.setShortUrl(slug);

            repository.save(url);
            cache(slug, originalUrl);

            return slug;
        }

        while (true) {
            try {
                String slug = ShortCodeGenerator.generateRandom();

                Url url = new Url();
                url.setOriginalUrl(originalUrl);
                url.setShortUrl(slug);

                repository.save(url);
                cache(slug, originalUrl);

                return slug;

            } catch (DataIntegrityViolationException ignored) {
            }
        }
    }

    public ResponseEntity<Void> getOriginalUrl(String code) {

        String cacheKey = CACHE_PREFIX + code;

        long redisStart = System.nanoTime();
        try {
            String cachedUrl = redisTemplate.opsForValue().get(cacheKey);
            long redisTimeMs = (System.nanoTime() - redisStart) / 1_000_000;

            if (cachedUrl != null) {
                log.info("Redis HIT time={} ms", redisTimeMs);

                return ResponseEntity.status(302)
                        .header("Location", cachedUrl)
                        .build();
            }

            log.info("Redis MISS time={} ms", redisTimeMs);

        } catch (Exception e) {
            long redisTimeMs = (System.nanoTime() - redisStart) / 1_000_000;
            log.warn("Redis ERROR time={} ms", redisTimeMs);
        }

        long dbStart = System.nanoTime();
        Url url = repository.findByShortUrl(code)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Short URL not found"
                        )
                );
        long dbTimeMs = (System.nanoTime() - dbStart) / 1_000_000;

        log.info("DB FALLBACK time={} ms", dbTimeMs);

        cache(code, url.getOriginalUrl());

        return ResponseEntity.status(302)
                .header("Location", url.getOriginalUrl())
                .build();
    }

    private void cache(String code, String url) {

        long redisStart = System.nanoTime();
        try {
            redisTemplate.opsForValue()
                    .set(CACHE_PREFIX + code, url, Duration.ofHours(24));

            long redisTimeMs = (System.nanoTime() - redisStart) / 1_000_000;
            log.info("Redis SET time={} ms", redisTimeMs);

        } catch (Exception e) {
            long redisTimeMs = (System.nanoTime() - redisStart) / 1_000_000;
            log.warn("Redis SET ERROR time={} ms", redisTimeMs);
        }
    }























































//    private final UrlRepository repository;
//    private final RedisTemplate<String, String> redisTemplate;
//
//    private static final String CACHE_PREFIX = "shorturl:";
//
//
//    //why didnt we used @Transactional
//
//    public String shortenUrl(String originalUrl) {
//
//        // 1️ Save URL (get ID)
//        Url url = new Url();
//        String shortCode = ShortCodeGenerator.generateRandom();
//        url.setOriginalUrl(originalUrl);
//        url.setShortUrl(shortCode);
//
//        url = repository.save(url);
//
//
//
//        // 2 Cache (best-effort)
//        try {
//            redisTemplate.opsForValue()
//                    .set(CACHE_PREFIX + shortCode, originalUrl, Duration.ofHours(24));
//        } catch (Exception e) {
//            // Redis failure should NOT break app
//        }
//        return shortCode;
//    }
//
//    public ResponseEntity<Void> getOriginalUrl(String code) {
//
//        String cacheKey = CACHE_PREFIX + code;
//        long start = System.nanoTime();
//
//        // 1️ Try Redis
//        try {
////            long redisStart = System.nanoTime();
//            String cachedUrl = redisTemplate.opsForValue().get(cacheKey);
////            long redisEnd = System.nanoTime();
//
////            System.out.println(
////                    "REDIS lookup took " + (redisEnd - redisStart) / 1_000_000 + " ms"
////            );
//
//            if (cachedUrl != null) {
////                long total = System.nanoTime();
////                System.out.println(
////                        "🔥 REDIS HIT | Total latency = " + (total - start) / 1_000_000 + " ms"
////                );
//
//                return ResponseEntity.status(302)
//                        .header("Location", cachedUrl)
//                        .build();
//            }
//
////            System.out.println("🟡 REDIS MISS");
//
//        } catch (Exception e) {
////            System.out.println("⚠️ REDIS ERROR | fallback to DB");
//        }
//
//        // 2️ DB fallback
////        long dbStart = System.nanoTime();
//        Url url = repository.findByShortUrl(code)
//                .orElseThrow(() -> new RuntimeException("Short URL not found"));
////        long dbEnd = System.nanoTime();
//
////        System.out.println(
////                "DB lookup took " + (dbEnd - dbStart) / 1_000_000 + " ms"
////        );
////
////        long total = System.nanoTime();
////        System.out.println(
////                " TOTAL latency = " + (total - start) / 1_000_000 + " ms"
////        );
//
//        return ResponseEntity.status(302)
//                .header("Location", url.getOriginalUrl())
//                .build();


}