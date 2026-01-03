package com.ajay.urlshortnerapp.service;

import com.ajay.urlshortnerapp.dto.UrlRequestDto;
import com.ajay.urlshortnerapp.model.Url;
import com.ajay.urlshortnerapp.repository.UrlRepository;
import com.ajay.urlshortnerapp.util.Base62;
import com.ajay.urlshortnerapp.util.ShortCodeGenerator;
import com.fasterxml.jackson.annotation.OptBoolean;
import jdk.jfr.consumer.RecordedStackTrace;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository repository;
    private static final long BASE_OFFSET = 10_000_000L;
    public ResponseEntity<String> shortenUrl(String originalUrl) {

        // 1️⃣ Save first (ID gets generated)
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url = repository.save(url);

        // 2️⃣ Encode numeric ID
        String shortCode = ShortCodeGenerator.generate(url.getId());

        // 3️⃣ Update short code
        url.setShortUrl(shortCode);
        repository.save(url);

        return ResponseEntity.ok(shortCode);
    }

    public ResponseEntity<Void> getOriginalUrl(String code) {
        Url url = repository.findByShortUrl(code)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));

        return ResponseEntity.status(302)
                .header("Location", url.getOriginalUrl())
                .build();
    }
}
