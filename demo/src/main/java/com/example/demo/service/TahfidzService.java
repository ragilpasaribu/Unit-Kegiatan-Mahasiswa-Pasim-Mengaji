package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.ProgramMember;
import com.example.demo.entity.Setoran;
import com.example.demo.entity.TahfidzProgress;
import com.example.demo.entity.TahfidzTask;
import com.example.demo.entity.User;
import com.example.demo.repository.ProgramMemberRepository;
import com.example.demo.repository.SetoranRepository;
import com.example.demo.repository.TahfidzProgressRepository;
import com.example.demo.repository.TahfidzTaskRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TahfidzService {

    private final SetoranRepository setoranRepo;
    private final TahfidzProgressRepository progressRepo;
    private final UserRepository userRepo;
    private final ProgramMemberRepository programMemberRepo;
    private final TahfidzTaskRepository taskRepo;

    public Setoran setor(String email, Setoran req) {

        User user = userRepo.findByEmail(email)
                .orElseThrow();

        req.setUser(user);
        req.setCreatedAt(LocalDateTime.now());
        req.setStatus("PENDING");

        return setoranRepo.save(req);
    }

    public void approveSetoran(Long id, String status, String note) {

        Setoran s = setoranRepo.findById(id).orElseThrow();

        s.setStatus(status);
        s.setNote(note);
        setoranRepo.save(s);

        ProgramMember pm = programMemberRepo
                .findByUser(s.getUser())
                .orElseThrow();

        TahfidzProgress p = progressRepo
                .findByProgramMember(pm)
                .orElseGet(() -> {
                    TahfidzProgress newP = new TahfidzProgress();
                    newP.setProgramMember(pm);
                    newP.setTotalSetoran(0);
                    newP.setTotalUlang(0);
                    return newP;
                });


        if (status.equals("LANCAR")) {

            p.setCurrentSurah(s.getSurah());
            p.setCurrentAyah(s.getEndAyah());
            p.setTotalSetoran(p.getTotalSetoran() + 1);
            p.setLastSetoranStatus(status);
            p.setLastSetoranNote(note);
        }

        if (status.equals("ULANG")) {

            p.setTotalUlang(p.getTotalUlang() + 1);
            p.setLastSetoranStatus(status);
            p.setLastSetoranNote(note);
        }

        p.setUpdatedAt(LocalDateTime.now());

        progressRepo.save(p);
    }

    public List<Setoran> getMySetoran(String email) {
        return setoranRepo.findByUserEmailOrderByCreatedAtDesc(email);
    }

    public TahfidzTask createTask(Long programMemberId, TahfidzTask req) {

        ProgramMember pm = programMemberRepo.findById(programMemberId)
                .orElseThrow();

        req.setProgramMember(pm);
        req.setActive(true);

        return taskRepo.save(req);
    }

    public List<TahfidzTask> getMyTasks(String email) {

        User user = userRepo.findByEmail(email).orElseThrow();

        ProgramMember pm = programMemberRepo
                .findByUser(user)
                .orElseThrow();

        return taskRepo.findByProgramMemberAndActiveTrue(pm);
    }
}