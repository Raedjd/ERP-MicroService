package com.ms.eventms.controller;
import com.ms.eventms.models.Event;
import com.ms.eventms.models.Rating;
import com.ms.eventms.repository.EventRepository;
import com.ms.eventms.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/rating")
public class RatingRestAPI {

    @Autowired
    IRatingService iRatingService;
    @Autowired
    EventRepository eventRepository;

    @PostMapping("/add/{idEvent}")
    public ResponseEntity<Rating> addRatingAndAssignToEvent(@RequestBody Rating rating, @PathVariable("idEvent") Long idEvent){

        Event event=eventRepository.findById(idEvent).orElse(null);
          if(event==null)
              return  new ResponseEntity("Event id is not found",HttpStatus.BAD_REQUEST);

        return   new ResponseEntity(iRatingService.addRatingAndAssignToEvent(rating,idEvent),HttpStatus.ACCEPTED);
    }


    @GetMapping("/ratingbyevent/{idEvent}")
    public ResponseEntity<Float>  getRatingsByEvent(@PathVariable("idEvent") Long idEvent) {
             return new ResponseEntity<Float>(iRatingService.getSumScoreByEvent(idEvent) ,HttpStatus.OK) ;
    }

}
