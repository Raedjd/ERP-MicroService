package org.emplyeeService.employeeServices.repository;

import org.emplyeeService.employeeServices.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Optional<Employee> findEmployeeById(Long id);
}
