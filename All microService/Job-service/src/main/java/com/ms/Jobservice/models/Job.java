package com.ms.Jobservice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition="TEXT")
    private String description;
    private String salary;
    private boolean status;
    @Temporal(TemporalType.DATE)
    private Date creationDate;
    @Temporal(TemporalType.DATE)
    private Date expirationDate;
    @Temporal(TemporalType.DATE)
    private Date updateDate;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "job", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Candidacy> candidacies;
    private Long managerId;
}
