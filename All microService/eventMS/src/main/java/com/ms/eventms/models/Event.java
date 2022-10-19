package com.ms.eventms.models;

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
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name ="event")
public class Event extends AbstractEntity {

    @Column(name = "title")
    private String title;

    @Column(name ="description")
    private String description;

    @Column(name ="place")
    private String place;

    @Column(name ="done")
    private Boolean done=false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate ;
    private String userId;

    @OneToMany(mappedBy = "event",  fetch = FetchType.EAGER, cascade = {  CascadeType.REMOVE })
    @JsonIgnore
    private List<Rating> ratings;

}
