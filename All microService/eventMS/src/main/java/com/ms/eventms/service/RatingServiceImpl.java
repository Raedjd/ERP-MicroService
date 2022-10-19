package com.ms.eventms.service;

import com.ms.eventms.models.Event;
import com.ms.eventms.models.Rating;
import com.ms.eventms.repository.EventRepository;
import com.ms.eventms.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RatingServiceImpl implements  IRatingService {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private EventRepository eventRepository;

    @Override
    public Rating addRatingAndAssignToEvent(Rating rating, Long idEvent) {

        Event event=eventRepository.findById(idEvent).orElse(null);
        rating.setEvent(event);
        return ratingRepository.save(rating);
    }


    @Override
    public float getSumScoreByEvent(Long idEvent) {
        List<Rating>  ratings=ratingRepository.RatingByEvent(idEvent);
        float sumScore=ratings.stream().map(s->s.getScoreRating()).reduce((float) 0, (a, b) -> a + b);
        return sumScore;
    }
}
