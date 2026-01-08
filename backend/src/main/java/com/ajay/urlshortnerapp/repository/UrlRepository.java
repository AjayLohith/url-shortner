package com.ajay.urlshortnerapp.repository;

import com.ajay.urlshortnerapp.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Spring generates: SELECT * FROM urls WHERE short_code = ?
    Optional<Url> findByShortUrl(String shortCode);

    // Optional: Useful to check if a code already exists
    boolean existsByShortUrl(String shortUrl);
}