package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProgramMember;
import com.example.demo.entity.TahfidzTask;

public interface TahfidzTaskRepository extends JpaRepository<TahfidzTask, Long>{
    List<TahfidzTask> findByProgramMemberAndActiveTrue(ProgramMember programMember);
}
