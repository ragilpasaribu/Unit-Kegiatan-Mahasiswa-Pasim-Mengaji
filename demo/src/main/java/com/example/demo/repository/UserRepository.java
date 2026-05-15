package com.example.demo.repository;

import java.util.Optional;
import java.util.List; 

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;
import com.example.demo.entity.Status; 

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByStatus(Status status);
}