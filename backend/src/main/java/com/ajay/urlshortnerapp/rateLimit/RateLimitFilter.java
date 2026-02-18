package com.ajay.urlshortnerapp.rateLimit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitService rateLimitService;

    @Value("${rate-limit.requests}")
    private int maxRequests;

    @Value("${rate-limit.window-seconds}")
    private int windowSeconds;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String clientIp = request.getRemoteAddr();
        String key = "rate:" + clientIp;

        try {
            boolean allowed = rateLimitService.isAllowed(
                    key, maxRequests, windowSeconds
            );

            if (!allowed) {
                response.setStatus(429);
                response.getWriter().write("Too Many Requests");
                return;
            }
        } catch (Exception e) {
            // FAIL OPEN: Redis down should not block traffic
        }

        filterChain.doFilter(request, response);
    }
}
