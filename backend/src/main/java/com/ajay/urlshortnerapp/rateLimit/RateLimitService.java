package com.ajay.urlshortnerapp.rateLimit;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RateLimitService {
    private final RedisTemplate<String,String>redisTemplate;

    public boolean isAllowed(String key,int maxRequests,int windowSeconds){
        Long count=redisTemplate.opsForValue().increment(key);

        if(count==1){
            redisTemplate.expire(key, Duration.ofSeconds(windowSeconds));
        }
        return count<=maxRequests;

    }
}
