package com.ajay.urlshortnerapp.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UrlRequestDto {

    @NotBlank(message = "URL is required")
    @Pattern(
            regexp = "^(http|https)://.*$",
            message = "URL must start with http:// or https://"
    )
    private String url;

    @Pattern(
            regexp = "^[a-zA-Z0-9_-]{3,20}$",
            message = "Custom slug must be 3–20 characters (letters, numbers, - or _)"
    )
    private String customSlug;
}
