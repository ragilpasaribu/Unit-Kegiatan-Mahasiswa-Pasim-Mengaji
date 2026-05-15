package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Materi {
    
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;

    @ManyToOne
    private Program program;

    private LocalDate createdAt;
}
