package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Candidacy;
import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.repository.CandidacyRepository;
import com.ms.Jobservice.repository.JobRepository;
import com.ms.Jobservice.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class CandidacyService implements ICandidacyService{
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private CandidacyRepository candidacyRepository;
    @Override
    public Candidacy addCandidacy(Long jobId, Candidacy candidacy,MultipartFile file) throws IOException {
        Job job = jobRepository.findById(jobId).get();
        return candidacyRepository.save(Candidacy.builder().fullName(candidacy.getFullName())
                .phoneNumber(candidacy.getPhoneNumber())
                .email(candidacy.getEmail())
                .linkedinPath(candidacy.getLinkedinPath())
                .job(job)
                .resumeName(file.getOriginalFilename())
                .resumeType(file.getContentType())
                .resumeData(FileUtils.compressFile(file.getBytes())).build());
    }
    @Override
    public byte[] downloadResume(Long id){
        Candidacy candidacy = candidacyRepository.findById(id).get();
        byte[] resume=FileUtils.decompressFile(candidacy.getResumeData());
        return resume;
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
