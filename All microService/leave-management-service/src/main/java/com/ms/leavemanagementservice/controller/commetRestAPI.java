package com.ms.leavemanagementservice.controller;

import com.ms.leavemanagementservice.models.Comment;
import com.ms.leavemanagementservice.models.Leave;
import com.ms.leavemanagementservice.repository.LeaveRepository;
import com.ms.leavemanagementservice.service.ICommentService;
import com.ms.leavemanagementservice.service.ILeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/comment")
public class commetRestAPI {

    @Autowired
    LeaveRepository leaveRepository;

    @Autowired
    private ICommentService iCommentService;


    @PostMapping("/add/{idLeave}")
    public ResponseEntity<Comment> CreateComment(@RequestBody Comment comment, @PathVariable("idLeave") Long idLeave){
        Leave leave=leaveRepository.findById(idLeave).orElse(null);
        if(leave==null)
            return  new ResponseEntity("Event id is not found",HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Comment>(iCommentService.addCommentAndAssignToLeave(comment, idLeave) , HttpStatus.CREATED) ;
    }

    @GetMapping("/findAll")
    public List<Comment> LeaveList(){
        return iCommentService.findAll();
    }

    @GetMapping("/findAllByLeave/{id}")
    public List<Comment
            > LeaveListForUser(@PathVariable("id") String id){
        return iCommentService.findCommentsByLeaveId(id);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Comment> findOne(@PathVariable("id") Long id){
        return  new ResponseEntity<Comment>( iCommentService.findCommentById(id) ,HttpStatus.OK);
    }



    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        iCommentService.deleteComment(id);
    }


}
