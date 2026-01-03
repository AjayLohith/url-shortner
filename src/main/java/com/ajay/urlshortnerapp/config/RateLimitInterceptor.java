//package com.ajay.urlshortnerapp.config;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.data.redis.core.StringRedisTemplate;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import java.time.Duration;
//
//@Component
//public class RateLimitInterceptor implements HandlerInterceptor {
//
//    private final StringRedisTemplate redisTemplate;
//
//    public RateLimitInterceptor(StringRedisTemplate redisTemplate) {
//        this.redisTemplate = redisTemplate;
//    }
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String ip = request.getRemoteAddr();
//        String key = "rate:limit:" + ip;
//
//        // Increment the count for this IP in Redis
//        Long count = redisTemplate.opsForValue().increment(key);
//
//        if (count != null && count == 1) {
//            // First request in the window, set expiration (e.g., 1 minute)
//            redisTemplate.expire(key, Duration.ofMinutes(1));
//        }
//
//        if (count != null && count > 10) { // Limit: 10 requests per minute
//            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
//            response.getWriter().write("Too many requests. Please try again in a minute.");
//            return false; // Stop the request here
//        }
//
//        return true; // Carry on to the Controller
//    }
//}
