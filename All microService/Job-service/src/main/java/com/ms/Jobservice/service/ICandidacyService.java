package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Candidacy;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICandidacyService {
    Candidacy addCandidacy(Long jobId , Candidacy candidacy);
    List<Candidacy> findCandidaciesByJob(Long jobId);
    List<Candidacy> findAcceptedCandidaciesByJob(Long jobId);
    boolean acceptCandidacy(Long id);
}
