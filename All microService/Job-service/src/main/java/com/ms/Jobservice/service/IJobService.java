package com.ms.Jobservice.service;

import com.ms.Jobservice.models.Job;

import java.util.List;

public interface IJobService {
    Job addJob(Job job);

    List<Job> findAllJobs();

    Job findJobById(Long idJob);

    Job updateJob(Job job, Long id);

    void deleteJob(Long id);
}
