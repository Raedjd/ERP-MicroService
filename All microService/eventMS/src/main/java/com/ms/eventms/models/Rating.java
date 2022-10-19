package com.ms.eventms.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name ="rating")
public class Rating extends AbstractEntity {

    private float scoreRating;
    private String userId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Event event;
}
