package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Candidacy;
import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.repository.CandidacyRepository;
import com.ms.Jobservice.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Service
public class CandidacyService implements ICandidacyService{
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private CandidacyRepository candidacyRepository;
    @Override
    public Candidacy addCandidacy(Long jobId, Candidacy candidacy) {
        Job job = jobRepository.findById(jobId).get();
        candidacy.setJob(job);
        return candidacyRepository.save(candidacy);
    }

    @Override
    public List<Candidacy> findCandidaciesByJob(Long jobId) {
        return candidacyRepository.findCandidaciesByJob(jobId);
    }

    @Override
    public List<Candidacy> findAcceptedCandidaciesByJob(Long jobId) {
        return candidacyRepository.findAcceptedCandidaciesByJob(jobId);
    }

    @Override
    public boolean acceptCandidacy(Long id) {
        Candidacy candidacy = candidacyRepository.findById(id).get();
        if (candidacy.isAccepted()==false){
            candidacy.setAccepted(true);
            candidacyRepository.save(candidacy);
            return true;
        }
        return false;
    }
}
