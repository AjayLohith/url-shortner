package com.ajay.urlshortnerapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "urls")
@Getter
@Setter
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String originalUrl;

    @Column(columnDefinition = "TEXT", unique = true, nullable = false)
    private String shortUrl;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}

