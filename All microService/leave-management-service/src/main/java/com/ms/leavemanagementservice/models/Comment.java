package com.ms.leavemanagementservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="comment")
public class Comment {
    @Id
    @GeneratedValue
    private Long id;

    private String userId;
    private String content;

    @ManyToOne
    @JoinColumn(name = "leave_id")
    private Leave leave;
}
