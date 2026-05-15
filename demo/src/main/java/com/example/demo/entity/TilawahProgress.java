package com.example.demo.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class TilawahProgress  {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIgnore
    private ProgramMember programMember;

    private String currentMaterial; 

    private String level; 

    private String lastEvaluation; 
    private String mentorNote;

    private Integer totalPertemuan;
    private Integer totalLulus;
    private Integer totalUlang;

    private Boolean isCompleted = false;

    private LocalDateTime updatedAt = LocalDateTime.now();

}
