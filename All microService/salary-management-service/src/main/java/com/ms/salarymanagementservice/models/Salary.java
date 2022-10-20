package com.ms.salarymanagementservice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="salary")
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId")
    private String userId;

    @Column(name ="basicSalary")
    private int basicSalary;

    @Column(name ="tax")
    private int tax;

    @Column(name ="otherPayements")
    private int otherPayement=0;

    @Column(name ="otherDecuctions")
    private int otherDecuctions=0;

    @Column(name ="grossPay")
    private int grossPay;

    @Column(name ="deducations")
    private int deducations;

    @Column(name ="overTime")
    private int overTime=0;

    @Column(name ="bonus")
    private int bonus=0;

    @Column(name ="netPay")
    private int netPay;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;



}
