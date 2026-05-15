package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProgramMember;
import com.example.demo.entity.User;

public interface ProgramMemberRepository extends JpaRepository <ProgramMember,Long>{
   Optional<ProgramMember> findByUserIdAndStatus(Long userId, String status);
    List<ProgramMember> findByUserId(Long userId);
    List<ProgramMember> findByStatus(String status);
    Optional<ProgramMember> findByUser(User user);
}
