package com.example.demo.entity;

import java.time.LocalDateTime;

import com.example.demo.enums.TargetType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class TahfidzProgress  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIgnore
    private ProgramMember programMember;

    @Enumerated(EnumType.STRING)
    private TargetType targetType;
    private String currentSurah; 
    private Integer currentAyah; 

    private String lastSetoranStatus; 
    private String lastSetoranNote; 

    private Integer totalSetoran;
    private Integer totalUlang; 

    private Boolean isCompleted = false;

    private LocalDateTime updatedAt = LocalDateTime.now();
}
