package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
public class JobService implements IJobService{
    @Autowired
    private JobRepository jobRepository;
    @Override
    public Job addJob(Job job) {
        job.setCreationDate(new Date());
        return this.jobRepository.save(job);
    }

    @Override
    public List<Job> findAllJobs() {
        return this.jobRepository.findAll();
    }

    @Override
    public Job findJobById(Long idJob) {
        return this.jobRepository.findById(idJob).orElse(null);
    }

    @Override
    public Job updateJob(Job job, Long id) {

        if (jobRepository.findById(id).isPresent()) {
            Job j = this.jobRepository.findById(id).get();
            j.setTitle(job.getTitle());
            j.setDescription(job.getDescription());
            j.setSalary(job.getSalary());
            j.setUpdateDate(new Date());
            j.setExpirationDate(job.getExpirationDate());
            return this.jobRepository.save(j);
        }
        return null;
    }

    @Override
    public void deleteJob(Long id) {
        this.jobRepository.deleteById(id);
    }
}
