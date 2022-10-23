package com.ms.leavemanagementservice.service;

import com.ms.leavemanagementservice.models.Comment;
import com.ms.leavemanagementservice.models.Leave;
import com.ms.leavemanagementservice.repository.CommentRepository;
import com.ms.leavemanagementservice.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public Comment addComment(Comment comment) {

        return commentRepository.save(comment);
    }
    @Override
    public Comment addCommentAndAssignToLeave(Comment comment, Long idLeave) {

        Leave event=leaveRepository.findById(idLeave).orElse(null);
        comment.setLeave(event);
        return commentRepository.save(comment);
    }
    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment findCommentById(Long idComment) {
        return commentRepository.findById(idComment).get();
    }

    @Override
    public List<Comment> findCommentsByLeaveId(String leaveId){
        return commentRepository.findAllByLeaveId(leaveId);
    }



    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

}
