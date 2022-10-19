package com.ms.eventms.service;

import com.ms.eventms.models.Event;

import java.util.List;

public interface IEventService {

    Event addEvent(Event e);

    List<Event> findAll();

    Event findEventById(Long idEvent);

    Event updateEvent(Event event, Long id);

    void deleteEvent(Long id);

    Event eventDone(Event event ,Long id);

    Long countEvents();
}
