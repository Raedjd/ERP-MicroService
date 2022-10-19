package com.ms.salarymanagementservice.repository;

import com.ms.salarymanagementservice.models.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaryRepository extends JpaRepository<Salary,Long> {

    List<Salary> findAllByUserId(String user);
}
