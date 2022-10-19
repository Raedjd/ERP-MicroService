package org.emplyeeService.employeeServices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.emplyeeService.employeeServices.exception.UserNotFoundException;
import org.emplyeeService.employeeServices.model.Employee;
import org.emplyeeService.employeeServices.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmplyees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(()->new UserNotFoundException("User by id "+id+"was not found"));
    }

    public void deleteEpmloyee(Long id) {
        employeeRepo.deleteById(id);
    }
}

