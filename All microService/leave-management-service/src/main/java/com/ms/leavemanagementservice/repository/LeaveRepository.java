package com.ms.leavemanagementservice.repository;

import com.ms.leavemanagementservice.models.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave,Long> {

    List<Leave> findAllByUserId(String user);
}
