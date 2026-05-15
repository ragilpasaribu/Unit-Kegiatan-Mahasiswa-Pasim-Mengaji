package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
     private final AdminService adminService;

    @GetMapping("/users/pending")
    public List<User> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    @PutMapping("/users/{id}/approve")
    public User approveUser(@PathVariable Long id) {
        return adminService.approveUser(id);
    }

    @PutMapping("/users/{id}/reject")
    public User rejectUser(@PathVariable Long id) {
        return adminService.rejectUser(id);
    }
}
