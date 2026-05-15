package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class TahfidzTask {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String surah;
    private Integer startAyah;
    private Integer endAyah;
    private Boolean active = true;

    private String note; 

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private ProgramMember programMember;
}
