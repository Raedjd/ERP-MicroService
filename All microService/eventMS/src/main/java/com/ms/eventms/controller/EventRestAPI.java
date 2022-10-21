package com.ms.eventms.controller;

import com.ms.eventms.models.Event;
import com.ms.eventms.repository.EventRepository;
import com.ms.eventms.service.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/event")
public class EventRestAPI {

    @Autowired
    private IEventService iEventService;

    @Autowired
    EventRepository eventRepository;

    @PostMapping("/add")
    public ResponseEntity<Event> CreateEvent(@RequestBody Event event){
       return new ResponseEntity<Event>(iEventService.addEvent(event) , HttpStatus.CREATED) ;
    }

    @GetMapping("/findAll")
    @ResponseBody
    public List<Event> EventList(){
        return iEventService.findAll();
    }

    @GetMapping("/find/{id}")
    public Event findOne(@PathVariable("id") Long id){
        return  iEventService.findEventById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Event modify(@RequestBody Event event,@PathVariable("id") Long id) {
        return iEventService.updateEvent(event , id);
    }


    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        iEventService.deleteEvent(id);
    }

    @GetMapping("/countevents")
    @ResponseStatus(HttpStatus.OK)
    public Long countUsers() {
        return iEventService.countEvents();
    }

    @PutMapping("/done/{id}")
    public ResponseEntity<Event> eventdone(@RequestBody Event e,@PathVariable("id") Long idEvent) {
        Event event=eventRepository.findById(idEvent).orElse(null);
        if(event==null)
            return  new ResponseEntity("Event id is not found",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<Event>( iEventService.eventDone(e,idEvent), HttpStatus.ACCEPTED );
    }
}
