package com.ms.eventservice.service;

import com.ms.eventservice.models.Rating;


public interface IRatingService {

    Rating addRatingAndAssignToEvent(Rating rating, Long idEvent);

    float getSumScoreByEvent(Long idEvent );

}
