package com.ms.Jobservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Candidacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private  String phoneNumber;
    private String email;
    private  String linkedinPath;
    private boolean accepted=false;
    private String resumeName;
    private String resumeType;
    @Lob
    @Column(length = 1000)
    private byte[] resumeData;
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
