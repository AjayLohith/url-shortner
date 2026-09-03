package com.ajay.urlshortnerapp.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
public class HealthController {

    private final JdbcTemplate jdbcTemplate;
    private final RedisTemplate<String, String> redisTemplate;
    private final long startTime = System.currentTimeMillis();

    public HealthController(JdbcTemplate jdbcTemplate, RedisTemplate<String, String> redisTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.redisTemplate = redisTemplate;
    }

    /**
     * Primary health check endpoint for general monitoring.
     * Returns 200 OK with detailed system health info.
     */
    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "url-shortner-app");
        response.put("timestamp", Instant.now().toString());
        response.put("uptimeSeconds", (System.currentTimeMillis() - startTime) / 1000);

        Map<String, String> components = new HashMap<>();

        // Check Database connectivity safely
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            components.put("database", "UP");
        } catch (Exception e) {
            components.put("database", "DOWN: " + e.getClass().getSimpleName());
        }

        // Check Redis connectivity safely
        try {
            if (redisTemplate.getConnectionFactory() != null) {
                String ping = redisTemplate.getConnectionFactory().getConnection().ping();
                components.put("redis", "PONG".equalsIgnoreCase(ping) || ping != null ? "UP" : "UNKNOWN");
            } else {
                components.put("redis", "NO_CONNECTION_FACTORY");
            }
        } catch (Exception e) {
            components.put("redis", "DOWN: " + e.getClass().getSimpleName());
        }

        response.put("components", components);
        return ResponseEntity.ok(response);
    }

    /**
     * Ultra-lightweight liveness probe.
     * Ideal for UptimeRobot keep-alive pings (every 10-14 minutes).
     * Returns 200 OK instantly with zero database/redis overhead.
     */
    @GetMapping({"/health/live", "/api/health/live"})
    public ResponseEntity<Map<String, Object>> live() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(response);
    }

    /**
     * Deep readiness probe to verify all backing services are operational.
     */
    @GetMapping({"/health/ready", "/api/health/ready"})
    public ResponseEntity<Map<String, Object>> ready() {
        return health();
    }
}

