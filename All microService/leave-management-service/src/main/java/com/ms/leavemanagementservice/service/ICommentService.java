package com.ms.leavemanagementservice.service;

import com.ms.leavemanagementservice.models.Comment;
import com.ms.leavemanagementservice.models.Leave;

import java.util.List;

public interface ICommentService {

    Comment addComment(Comment comment);

    List<Comment> findAll();

    Comment findCommentById(Long idComment);

    List<Comment> findCommentsByLeaveId(String leaveId);

     Comment addCommentAndAssignToLeave(Comment comment, Long idLeave);
    void deleteComment(Long id);


}
