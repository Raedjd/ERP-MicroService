package com.ms.leavemanagementservice.service;

import com.ms.leavemanagementservice.models.Leave;
import com.ms.leavemanagementservice.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements ILeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public Leave addLeave(Leave leave) {

        return leaveRepository.save(leave);
    }

    @Override
    public List<Leave> findAll() {
        return leaveRepository.findAll();
    }

    @Override
    public Leave findLeaveById(Long idLeave) {
        return leaveRepository.findById(idLeave).get();
    }

    @Override
    public List<Leave> findLeavesByUserId(String userId){
        return leaveRepository.findAllByUserId(userId);
    }

    @Override
    public Leave updateLeave(Leave leave, Long id) {
        if (leaveRepository.findById(id).isPresent()) {
            Leave l = leaveRepository.findById(id).get();
            l.setStart_date(leave.getStart_date());
            l.setEnd_date(leave.getEnd_date());
            l.setStatus(leave.getStatus());
            l.setType(leave.getType());
            return leaveRepository.save(l);
        }
        return null;
    }

    @Override
    public Leave approveLeave(Long id) {
        if (leaveRepository.findById(id).isPresent()) {
            Leave l = leaveRepository.findById(id).get();
            l.setStatus("approved");
            return leaveRepository.save(l);
        }
        return null;
    }

    @Override
    public Leave declineLeave(Long id) {
        if (leaveRepository.findById(id).isPresent()) {
            Leave l = leaveRepository.findById(id).get();
            l.setStatus("declined");
            return leaveRepository.save(l);
        }
        return null;
    }


    @Override
    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }

}
