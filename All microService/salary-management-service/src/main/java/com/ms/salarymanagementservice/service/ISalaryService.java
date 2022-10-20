package com.ms.salarymanagementservice.service;

import com.ms.salarymanagementservice.models.Salary;

import java.util.List;

public interface ISalaryService {

    Salary addSalary(Salary salary);

    List<Salary> findAll();

    Salary findSalaryById(Long idSalary);

    List<Salary> findSalaryByUserId(String userId);

    Salary updateSalary(Salary salary, Long id);

    void deleteSalary(Long id);


}
