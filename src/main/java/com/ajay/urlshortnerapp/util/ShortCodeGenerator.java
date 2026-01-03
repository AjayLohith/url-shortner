package com.ajay.urlshortnerapp.util;

public final class ShortCodeGenerator {

    // prevents very short URLs
    private static final long BASE_OFFSET = 10_000_000L;

    // obfuscation salt (can be env-specific)
    private static final long SALT = 0x5DEECE66DL;

    private ShortCodeGenerator() {}

    public static String generate(long id) {
        long obfuscated = (id + BASE_OFFSET) ^ SALT;
        return Base62.encode(obfuscated);
    }
}
