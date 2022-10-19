package com.ms.eventms.service;

import com.ms.eventms.models.Rating;


public interface IRatingService {

    Rating addRatingAndAssignToEvent(Rating rating, Long idEvent);

    float getSumScoreByEvent(Long idEvent );

}
