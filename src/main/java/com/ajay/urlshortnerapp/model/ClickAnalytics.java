package com.ajay.urlshortnerapp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "click_analytics")
public class ClickAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "url_id")
    private Url url;

    private LocalDateTime clickTimestamp;
    private String country; // Use an IP-to-Country API
    private String deviceType; // Mobile, Desktop, Tablet
    private String browser; // Chrome, Firefox, etc.
}
