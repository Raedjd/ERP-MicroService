package com.ms.eventms.repository;

import com.ms.eventms.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query("SELECT COUNT(u) FROM Event u ")
    Long getCountEvents();
}
