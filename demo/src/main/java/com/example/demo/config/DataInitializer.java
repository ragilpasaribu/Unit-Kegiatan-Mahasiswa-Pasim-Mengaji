package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entity.ProgramStudi;
import com.example.demo.entity.Role;
import com.example.demo.entity.Status;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Dotenv dotenv = Dotenv.load();

    @Bean
    CommandLineRunner initAdmin() {
        return args -> {

            String adminEmail = dotenv.get("ADMIN_EMAIL");
            String adminPassword = dotenv.get("ADMIN_PASSWORD");

            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                User admin = User.builder()
                        .name("Admin")
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .role(Role.ADMIN)
                        .status(Status.APPROVED)
                        .programStudi(ProgramStudi.TEKNIK_INFORMATIKA)
                        .build();

                userRepository.save(admin);

                System.out.println("Admin default berhasil dibuat");
            }
        };
    }
}