package com.ms.leavemanagementservice.service;

import com.ms.leavemanagementservice.models.Leave;

import java.util.List;

public interface ILeaveService {

    Leave addLeave(Leave leave);

    List<Leave> findAll();

    Leave findLeaveById(Long idSalary);

    List<Leave> findLeavesByUserId(String userId);

    Leave updateLeave(Leave leave, Long id);

    Leave approveLeave( Long id);

    Leave declineLeave( Long id);

    void deleteLeave(Long id);


}
