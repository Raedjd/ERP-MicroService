package org.emplyeeService.employeeServices.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false,updatable = false)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String jobTitle;
    private String phone;
    private String Department;

    public Employee() {}
    public Employee(String firstName,String lastName,String email,String jobTitle,String phone,String Department) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.jobTitle=jobTitle;
        this.phone=phone;
        this.Department=Department;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id=id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName=firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName=lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email=email;
    }
    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobTitle(String jobTitle) {
        this.jobTitle=jobTitle;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone=phone;
    }
    public String getDepartment() {
        return Department;
    }
    public void setDepartment(String Department) {
        this.Department=Department;
    }
}
