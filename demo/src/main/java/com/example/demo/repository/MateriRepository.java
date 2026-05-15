package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Materi;

public interface MateriRepository extends JpaRepository<Materi,Long>{
    
}
