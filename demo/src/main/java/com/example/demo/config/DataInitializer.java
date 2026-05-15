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

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer  {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initAdmin() {
        return args -> {

            
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {

                User admin = User.builder()
                        .name("Admin")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("Admin@123")) 
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
