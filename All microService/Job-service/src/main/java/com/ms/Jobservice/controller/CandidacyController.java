package com.ms.Jobservice.controller;

import com.ms.Jobservice.models.Candidacy;
import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.service.ICandidacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/Candidacy")
public class CandidacyController {
    @Autowired
    private ICandidacyService iCandidacyService;
    @PostMapping("/add/{job-id}")
    public ResponseEntity<Candidacy> createCandidacy(@RequestParam("resume") MultipartFile file,
            @RequestParam("fullName") String fullName,@RequestParam("phoneNumber") String phoneNumber,@RequestParam("email") String email,
            @RequestParam("linkedinPath") String linkedinPath,@PathVariable("job-id") Long jobId) throws IOException {
        Candidacy candidacy = new Candidacy();
        candidacy.setFullName(fullName);
        candidacy.setPhoneNumber(phoneNumber);
        candidacy.setEmail(email);
        candidacy.setLinkedinPath(linkedinPath);
        return new ResponseEntity<Candidacy>(iCandidacyService.addCandidacy(jobId, candidacy, file) , HttpStatus.CREATED);
    }
    @GetMapping("/downloadResume/{id}")
    public ResponseEntity<?> downloadResume(@PathVariable("id") Long id){
        byte[] resumeData= iCandidacyService.downloadResume(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("application/pdf"))
                .body(resumeData);

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
