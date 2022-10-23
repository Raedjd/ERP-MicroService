package com.ms.leavemanagementservice.models;

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
@Table(name ="leaves")
public class Leave {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "userId")
    private String userId;

    @Column(name = "status")
    private String status= "pending";

    @Column(name ="type")
    private String type;

    @Column(name ="payed")
    private boolean payed;

    @Temporal(TemporalType.TIMESTAMP)
    private Date start_date;

    @Temporal(TemporalType.TIMESTAMP)
    private Date end_date;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "leave", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;
}
