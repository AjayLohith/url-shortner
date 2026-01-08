package com.ajay.urlshortnerapp.util;

import java.util.regex.Pattern;

public final class SlugValidator {

    // a-z A-Z 0-9 - _
    private static final Pattern SLUG_PATTERN =
            Pattern.compile("^[a-zA-Z0-9_-]{3,20}$");

    private SlugValidator() {}

    public static boolean isValid(String slug) {
        return SLUG_PATTERN.matcher(slug).matches();
    }
}

