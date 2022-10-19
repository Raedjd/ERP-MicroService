package org.entretien.entretienService.model;

import lombok.Data;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class Entretien implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(nullable=false,updatable = false)
    private Long Id;
    private String employee;
    private String candidature;
    private Date dateEntretien;
    private String roleEntretien;
    private String lienEntretien;
}
