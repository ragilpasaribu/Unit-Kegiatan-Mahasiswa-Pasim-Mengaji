package com.example.demo.dto;

import com.example.demo.enums.TargetType;

import lombok.Data;

@Data
public class JoinProgramRequest {
    private Long userId;
    private Long programId;
    private TargetType targetType;
}
