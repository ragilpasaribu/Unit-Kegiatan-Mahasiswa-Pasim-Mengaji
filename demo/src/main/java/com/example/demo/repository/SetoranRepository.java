package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Setoran;

public interface SetoranRepository extends JpaRepository<Setoran,Long> {
    List<Setoran> findByUserEmailOrderByCreatedAtDesc(String email);
}
