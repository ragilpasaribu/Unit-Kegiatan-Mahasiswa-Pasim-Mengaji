package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.example.demo.dto.JoinProgramRequest;
import com.example.demo.entity.Materi;
import com.example.demo.entity.Program;
import com.example.demo.entity.Setoran;
import com.example.demo.entity.TahfidzTask;
import com.example.demo.repository.MateriRepository;
import com.example.demo.repository.ProgramRepository;
import com.example.demo.service.ProgramService;
import com.example.demo.service.TahfidzService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/program")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramRepository programRepo;
    private final TahfidzService tahfidzService;
    private final MateriRepository materiRepo;

   @PostMapping("/join")
    public ResponseEntity<?> join(
            Authentication auth,
            @RequestBody JoinProgramRequest request) {

        return ResponseEntity.ok(
            programService.joinProgram(
                auth.getName(), 
                request.getProgramId(),
                request.getTargetType() 
            )
        );
    }

    @GetMapping
    public List<Program> getAll() {
        return programRepo.findAll();
    }

   @GetMapping("/me")
    public ResponseEntity<?> getMyProgram(Authentication auth) {

        return ResponseEntity.ok(
            programService.getUserProgram(auth.getName())
        );
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approve(
            @PathVariable Long id,
            Authentication auth
    ) {
        return ResponseEntity.ok(
            programService.approveProgram(id, auth.getName())
        );
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingPrograms() {
        return ResponseEntity.ok(programService.getPendingPrograms());
    }

    @PostMapping("/setor")
    public ResponseEntity<?> setor(
            Authentication auth,
            @RequestBody Setoran req
    ) {
        return ResponseEntity.ok(
            tahfidzService.setor(auth.getName(), req)
        );
    }

    @PostMapping("/setor/{id}/approve")
    public ResponseEntity<?> approve(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam String note
    ) {
        tahfidzService.approveSetoran(id, status, note);
        return ResponseEntity.ok("Updated");
    }

    @GetMapping("/setoran/me")
    public ResponseEntity<?> getMySetoran(Authentication auth) {
        return ResponseEntity.ok(
            tahfidzService.getMySetoran(auth.getName())
        );
    }

    @GetMapping("/materi")
    public List<Materi> getMateri() {
        return materiRepo.findAll();
    }

    @PostMapping("/task")
    public ResponseEntity<?> createTask(
            @RequestParam Long programMemberId,
            @RequestBody TahfidzTask req
    ) {
        return ResponseEntity.ok(
            tahfidzService.createTask(programMemberId, req)
        );
    }

    @GetMapping("/task/me")
    public ResponseEntity<?> getMyTask(Authentication auth) {
        return ResponseEntity.ok(
            tahfidzService.getMyTasks(auth.getName())
        );
    }
}
