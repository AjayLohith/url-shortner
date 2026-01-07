//package com.ajay.urlshortnerapp.repository;
//
//import com.ajay.urlshortnerapp.model.ClickAnalytics;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.List;
//
//public interface ClickAnalyticsRepository extends JpaRepository<ClickAnalytics, Long> {
//    @Query("SELECT CAST(c.clickTimestamp AS date) as date, COUNT(c) as count " +
//            "FROM ClickAnalytics c WHERE c.url.shortUrl = :shortCode " +
//            "GROUP BY CAST(c.clickTimestamp AS date) ORDER BY date DESC")
//    List<Object[]> getClickTrend(String shortCode);
//
//    @Query("SELECT u.originalUrl, u.shortUrl, COUNT(c) FROM Url u " +
//            "LEFT JOIN u.clicks c GROUP BY u.id")
//    List<Object[]> findAllWithClickCounts();
//}