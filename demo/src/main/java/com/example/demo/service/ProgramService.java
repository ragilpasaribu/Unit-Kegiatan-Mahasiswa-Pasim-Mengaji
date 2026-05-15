package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Program;
import com.example.demo.entity.ProgramMember;
import com.example.demo.entity.Role;
import com.example.demo.entity.TahfidzProgress;
import com.example.demo.entity.TilawahProgress;
import com.example.demo.entity.User;
import com.example.demo.enums.TargetType;
import com.example.demo.repository.ProgramMemberRepository;
import com.example.demo.repository.ProgramRepository;
import com.example.demo.repository.TahfidzProgressRepository;
import com.example.demo.repository.TilawahProgressRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepo;
    private final ProgramMemberRepository memberRepo;
    private final UserRepository userRepo;
    private final TahfidzProgressRepository tahfidzRepo;
    private final TilawahProgressRepository tilawahRepo;

    public ProgramMember joinProgram(String email, Long programId, TargetType targetType) {

   System.out.println("EMAIL LOGIN: " + email);

    User user = userRepo.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

    System.out.println("ROLE USER: " + user.getRole());
    Optional<ProgramMember> existing =
        memberRepo.findByUserIdAndStatus(user.getId(), "ACTIVE");

    if (existing.isPresent()) {
        throw new RuntimeException("Kamu masih punya program aktif");
    }

    Optional<ProgramMember> pending =
        memberRepo.findByUserIdAndStatus(user.getId(), "PENDING");

    if (pending.isPresent()) {
        throw new RuntimeException("Kamu masih menunggu persetujuan");
    }

    if (user.getRole() != Role.ANGGOTA) {
        throw new RuntimeException("Hanya anggota yang boleh daftar");
    }

    Program program = programRepo.findById(programId)
        .orElseThrow(() -> new RuntimeException("Program tidak ditemukan"));

        ProgramMember member = new ProgramMember();
        member.setUser(user);
        member.setProgram(program);
        member.setStatus("PENDING");

        member = memberRepo.save(member);

        if (program.getName().toUpperCase().contains("TAHFIDZ")) {

        if (targetType == null) {
            throw new RuntimeException("Target hafalan wajib dipilih");
        }

        TahfidzProgress tp = new TahfidzProgress();
        tp.setProgramMember(member);
        tp.setTargetType(targetType);
        tp.setCurrentSurah("Al-Fatihah");
        tp.setCurrentAyah(1);

        tahfidzRepo.save(tp);

    } else if (program.getName().toUpperCase().contains("TILAWAH")) {

        TilawahProgress tl = new TilawahProgress();
        tl.setProgramMember(member);
        tl.setCurrentMaterial("Makharijul Huruf");
        tl.setLevel("DASAR");

        tilawahRepo.save(tl);
    }
        return member;
}
  public ProgramMember getUserProgram(String email) {

        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        return memberRepo.findByUserId(user.getId())
            .stream()
            .findFirst()
            .orElse(null);
    }

    public ProgramMember approveProgram(Long id, String email) {

        User mentor = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        if (mentor.getRole() != Role.PENGURUS) {
            throw new RuntimeException("Hanya pengurus yang boleh approve");
        }

        ProgramMember member = memberRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Data tidak ditemukan"));

        member.setStatus("ACTIVE");
        member.setMentorId(mentor.getId());

        return memberRepo.save(member);
    }

    public List<ProgramMember> getPendingPrograms() {
        return memberRepo.findByStatus("PENDING");
    }
}