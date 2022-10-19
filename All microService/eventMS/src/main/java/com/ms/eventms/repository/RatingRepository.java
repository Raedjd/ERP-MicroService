package com.ms.eventms.repository;

import com.ms.eventms.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("SELECT  R FROM Rating  R JOIN  R.event E WHERE E.id=?1 ")
    List<Rating> RatingByEvent (Long idEvent);
}
