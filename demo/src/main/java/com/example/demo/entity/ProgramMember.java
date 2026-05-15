package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class ProgramMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Program program;

    private String status; 

    private Long mentorId; 

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne(mappedBy = "programMember", cascade = CascadeType.ALL)
    private TahfidzProgress tahfidzProgress;

    @OneToOne(mappedBy = "programMember", cascade = CascadeType.ALL)
    private TilawahProgress tilawahProgress;
}
