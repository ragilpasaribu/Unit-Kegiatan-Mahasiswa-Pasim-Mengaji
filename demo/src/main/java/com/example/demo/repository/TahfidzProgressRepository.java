package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProgramMember;
import com.example.demo.entity.TahfidzProgress;

public interface TahfidzProgressRepository  extends JpaRepository<TahfidzProgress,Long>{
 
     Optional<TahfidzProgress> findByProgramMember(ProgramMember programMember);
}
