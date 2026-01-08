package com.ajay.urlshortnerapp.controller;

import com.ajay.urlshortnerapp.dto.UrlRequestDto;
import com.ajay.urlshortnerapp.service.UrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping
@RequiredArgsConstructor
public class UrlController {
    private final UrlService service;
    @Value("${app.base-url}")
    private String baseUrl;
    @PostMapping("/shorten")
    public ResponseEntity<String> shorten(@Valid @RequestBody UrlRequestDto request) {

        String code = service.shorten(
                request.getUrl(),
                request.getCustomSlug()
        );

        return ResponseEntity.ok(baseUrl + "/" + code);
    }

    @GetMapping("/{code}")
    public ResponseEntity<Void> redirect(@PathVariable String code) {
        return service.getOriginalUrl(code);
    }
}