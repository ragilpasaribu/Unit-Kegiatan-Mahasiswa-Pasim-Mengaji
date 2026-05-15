package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Setoran {
    
    @Id
    @GeneratedValue
    private Long id;

    private String surah;
    private int startAyah;
    private int endAyah;

    private String status;
    private String note;

    @ManyToOne
    private User user;

    private LocalDateTime createdAt;
}
