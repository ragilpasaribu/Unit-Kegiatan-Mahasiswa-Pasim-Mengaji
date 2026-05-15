package com.example.demo;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.entity.Program;
import com.example.demo.repository.ProgramRepository;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("hello world");
	}

	@Bean
    CommandLineRunner seedProgram(ProgramRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                Program t1 = new Program();
                t1.setName("Tahfidz");
                t1.setDescription("Program hafalan");

                Program t2 = new Program();
                t2.setName("Tilawah");
                t2.setDescription("Program bacaan");

                repo.saveAll(List.of(t1, t2));
            }
        };
    }

}
