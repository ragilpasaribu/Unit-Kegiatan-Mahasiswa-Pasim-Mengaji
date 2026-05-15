package com.example.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.Status;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

   public User register(RegisterRequest request) {
        if (request.getRole() == Role.ADMIN) {
            throw new RuntimeException("Tidak boleh daftar sebagai ADMIN");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .programStudi(request.getProgramStudi())
                .status(Status.PENDING)
                .build();

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Email tidak ditemukan"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Password salah");
    }

    if (user.getStatus() != Status.APPROVED) {
        throw new RuntimeException("Akun belum disetujui admin");
    }

    String token = jwtService.generateToken(
            user.getEmail(),
            user.getRole().name()
    );

    return new AuthResponse(token, "Login berhasil");
    }

    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }
}
