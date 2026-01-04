package com.ajay.urlshortnerapp.controller;

import com.ajay.urlshortnerapp.dto.UrlRequestDto;
import com.ajay.urlshortnerapp.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UrlController {
    private final UrlService service;

    @PostMapping("/shorten")
    public ResponseEntity<String> shorten(@RequestBody UrlRequestDto request) {
        return service.shortenUrl(request.getUrl());

    }

    @GetMapping("/{code}")
    public ResponseEntity<Void> redirect(@PathVariable String code) {
        return service.getOriginalUrl(code);
    }
}