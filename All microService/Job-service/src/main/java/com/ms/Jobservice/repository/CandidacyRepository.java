package com.ms.Jobservice.repository;

import com.ms.Jobservice.models.Candidacy;
import com.ms.Jobservice.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidacyRepository extends JpaRepository<Candidacy,Long> {
    @Query("SELECT c FROM Candidacy c WHERE c.job.id = :jobId")
    List<Candidacy> findCandidaciesByJob(@Param("jobId") Long jobId);
    @Query("SELECT c FROM Candidacy c WHERE c.job.id = :jobId and c.accepted =true ")
    List<Candidacy> findAcceptedCandidaciesByJob(@Param("jobId") Long jobId);
}
