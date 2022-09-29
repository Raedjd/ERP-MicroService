package com.ms.eventservice.repository;

import com.ms.eventservice.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query("SELECT COUNT(u) FROM Event u ")
    Long getCountEvents();
}
