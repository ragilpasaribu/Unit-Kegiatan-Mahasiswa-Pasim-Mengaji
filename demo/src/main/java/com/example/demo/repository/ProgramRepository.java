package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Program;

public interface ProgramRepository extends JpaRepository<Program,Long>{
    
}
