package com.ms.eventms.service;

import com.ms.eventms.models.Event;
import com.ms.eventms.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements IEventService{

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event addEvent(Event e) {
       return eventRepository.save(e);
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findEventById(Long idEvent) {
        return eventRepository.findById(idEvent).get();
    }

    @Override
    public Event updateEvent(Event event, Long id) {
        if (eventRepository.findById(id).isPresent()) {
            Event e = eventRepository.findById(id).get();
            e.setTitle(event.getTitle());
            e.setDescription(event.getDescription());
            e.setStartDate(event.getStartDate());
            e.setEndDate(event.getEndDate());
            return eventRepository.save(e);
        }
        return null;
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Event eventDone(Event event, Long id) {
        if (eventRepository.findById(id).isPresent()) {
            Event e = eventRepository.findById(id).get();
            e.setDone(event.getDone());
            return eventRepository.save(e);
        }
        return null;
    }

    @Override
    public Long countEvents() {
        return eventRepository.getCountEvents();
    }
}
