import React, { createContext, useState, useEffect } from 'react';
import {
  fetchAllEvents,
  addEventToBD,
  deleteEventFromBD,
} from '../gateway/events';
import moment from 'moment';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(
          data.map((event) => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          }))
        );
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const addEventToCalendar = async (eventForCalendar) => {
    const { title, date, startTime, endTime, description } = eventForCalendar;

    const formattingDate = (date, time) =>
      moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toDate();

    const newEvent = {
      title,
      description,
      dateFrom: formattingDate(date, startTime),
      dateTo: formattingDate(date, endTime),
    };

    try {
      const addedEvent = await addEventToBD(newEvent);
      if (addedEvent) {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...addedEvent,
            dateFrom: new Date(addedEvent.dateFrom),
            dateTo: new Date(addedEvent.dateTo),
          },
        ]);
      }
    } catch (err) {
      setError('Failed to add event into DB. Please try again later.');
      console.error('Error adding event:', err);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await deleteEventFromBD(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (err) {
      setError('Failed to delete event. Please try again later.');
      console.error('Error deleting event:', err);
    }
  };

  const value = { events, addEventToCalendar, deleteEvent, error };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
