package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern; 

import com.example.demo.entity.ProgramStudi;
import com.example.demo.entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest  {
    
    @NotBlank(message = "Nama wajib diisi")
    private String name;

    @Email(message = "Email tidak valid")
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$",
        message = "Password harus minimal 8 karakter, ada huruf besar, kecil, angka, dan simbol"
    )
    private String password;

    @NotNull
    private Role role;

    @NotNull
    private ProgramStudi programStudi;
}
