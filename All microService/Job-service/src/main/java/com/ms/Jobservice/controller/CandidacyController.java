package com.ms.Jobservice.controller;

import com.ms.Jobservice.models.Candidacy;
import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.service.ICandidacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/Candidacy")
public class CandidacyController {
    @Autowired
    private ICandidacyService iCandidacyService;
    @PostMapping("/add/{job-id}")
    public ResponseEntity<Candidacy> createCandidacy(@RequestBody Candidacy candidacy, @PathVariable("job-id") Long jobId) {
        return new ResponseEntity<Candidacy>(iCandidacyService.addCandidacy(jobId, candidacy) , HttpStatus.CREATED);
    }
    @GetMapping("/acceptedCandidaciesByJob/{id}")
    @ResponseBody
    public List<Candidacy> retrieveAcceptedCandidaciesByJob(@PathVariable("id") Long jobId){
        return iCandidacyService.findAcceptedCandidaciesByJob(jobId);
    }
    @GetMapping("/findByJob/{id}")
    @ResponseBody
    public List<Candidacy> retrieveCandidaciesByJob(@PathVariable("id") Long jobId) {
        return iCandidacyService.findCandidaciesByJob(jobId);
    }
    @PutMapping("/acceptCandidacy/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean acceptCandidacy(@PathVariable("id") Long id) {
        return iCandidacyService.acceptCandidacy(id);
    }
}
