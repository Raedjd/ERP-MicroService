package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Candidacy;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICandidacyService {
    Candidacy addCandidacy(Long jobId , Candidacy candidacy ,MultipartFile file) throws IOException;
    List<Candidacy> findCandidaciesByJob(Long jobId);
    List<Candidacy> findAcceptedCandidaciesByJob(Long jobId);
    boolean acceptCandidacy(Long id);
    byte[] downloadResume(Long id);
}
