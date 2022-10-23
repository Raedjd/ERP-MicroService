package com.ms.leavemanagementservice.controller;

import com.ms.leavemanagementservice.models.Leave;
import com.ms.leavemanagementservice.service.ILeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/leave")
public class leaveRestAPI {

    @Autowired
    private ILeaveService iLeaveService;


    @PostMapping("/add")
    public ResponseEntity<Leave> CreateLeave(@RequestBody Leave leave){
        return new ResponseEntity<Leave>(iLeaveService.addLeave(leave) , HttpStatus.CREATED) ;
    }

    @GetMapping("/findAll")
    public List<Leave> LeaveList(){
        return iLeaveService.findAll();
    }

    @GetMapping("/findAllByUser/{id}")
    public List<Leave> LeaveListForUser(@PathVariable("id") String id){
        return iLeaveService.findLeavesByUserId(id);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Leave> findOne(@PathVariable("id") Long id){
        return  new ResponseEntity<Leave>( iLeaveService.findLeaveById(id) ,HttpStatus.OK);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Leave> approve(@PathVariable("id") Long id){
        return  new ResponseEntity<Leave>( iLeaveService.approveLeave(id) ,HttpStatus.OK);
    }

    @PutMapping("/decline/{id}")
    public ResponseEntity<Leave> decline(@PathVariable("id") Long id){
        return  new ResponseEntity<Leave>( iLeaveService.declineLeave(id) ,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Leave modify(@RequestBody Leave leave, @PathVariable("id") Long id) {
        return iLeaveService.updateLeave(leave, id);
    }


    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        iLeaveService.deleteLeave(id);
    }


}
