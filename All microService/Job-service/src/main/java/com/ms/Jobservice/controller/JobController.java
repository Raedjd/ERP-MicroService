package com.ms.Jobservice.controller;

import com.ms.Jobservice.models.Job;
import com.ms.Jobservice.service.IJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/job")
public class JobController {
    @Autowired
    private IJobService iJobService;

    @GetMapping("/findAll")
    public List<Job> retrieveAllJobs(){
        return iJobService.findAllJobs();
    }

    @PostMapping("/add")
    public ResponseEntity<Job>retrieveJob(@RequestBody Job job){
        return new ResponseEntity<Job>(iJobService.addJob(job) , HttpStatus.CREATED) ;
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Job>findOne(@PathVariable("id") Long id){
        return  new ResponseEntity<Job> ( iJobService.findJobById(id) ,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Job modifyJob(@RequestBody Job job,@PathVariable("id") Long id) {
        return iJobService.updateJob(job, id);
    }
    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void createJob(@PathVariable("id") Long id) {
        iJobService.deleteJob(id);
    }
}
