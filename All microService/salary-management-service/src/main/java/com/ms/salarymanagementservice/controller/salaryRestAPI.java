package com.ms.salarymanagementservice.controller;

import com.ms.salarymanagementservice.models.Salary;
import com.ms.salarymanagementservice.repository.SalaryRepository;
import com.ms.salarymanagementservice.service.ISalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/salary")
public class salaryRestAPI {

    @Autowired
    private ISalaryService iSalaryService;


    @PostMapping("/add")
    public ResponseEntity<Salary> CreateSalary(@RequestBody Salary salary){
        return new ResponseEntity<Salary>(iSalaryService.addSalary(salary) , HttpStatus.CREATED) ;
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Salary> SalaryList(){
        return iSalaryService.findAll();
    }

    @GetMapping("/findAllByUser/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Salary> SalaryListForUser(@PathVariable("id") String id){
        return iSalaryService.findSalaryByUserId(id);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Salary> findOne(@PathVariable("id") Long id){
        return  new ResponseEntity<Salary>( iSalaryService.findSalaryById(id) ,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Salary modify(@RequestBody Salary salary,@PathVariable("id") Long id) {
        return iSalaryService.updateSalary(salary , id);
    }


    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        iSalaryService.deleteSalary(id);
    }


}
