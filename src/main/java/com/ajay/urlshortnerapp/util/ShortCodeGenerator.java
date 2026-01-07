package com.ajay.urlshortnerapp.util;

import java.security.SecureRandom;

public final class ShortCodeGenerator {

    private static final String BASE62 =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int LENGTH = 7; // 62^7 ≈ 3.5 trillion

    private ShortCodeGenerator() {}

    public static String generateRandom() {
        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            sb.append(BASE62.charAt(RANDOM.nextInt(BASE62.length())));
        }
        return sb.toString();
    }
}

