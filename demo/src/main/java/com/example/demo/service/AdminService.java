package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Status;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService  {
     private final UserRepository userRepository;

    public List<User> getPendingUsers() {
        return userRepository.findByStatus(Status.PENDING);
    }

    public User approveUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        user.setStatus(Status.APPROVED);
        return userRepository.save(user);
    }

    public User rejectUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        user.setStatus(Status.REJECTED);
        return userRepository.save(user);
    }
}
