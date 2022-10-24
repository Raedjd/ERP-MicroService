package com.ms.leavemanagementservice.repository;

import com.ms.leavemanagementservice.models.Comment;
import com.ms.leavemanagementservice.models.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment ,Long> {
    List<Comment> findAllByLeaveId(String leave);
}
