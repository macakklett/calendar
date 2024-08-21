import React, { createContext, useState, useEffect } from 'react';
import { fetchAllEvents, addEventToBD, deleteEventFromBD } from '../gateway/events';
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
          data.map(event => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          })),
        );
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
        alert('Failed to load events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  const addEventToCalendar = async eventForCalendar => {
    const { title, date, startTime, endTime, description } = eventForCalendar;

    const convertToDate = (date, time) => {
      return new Date(`${date}T${time}:00`);
    };

    const newEvent = {
      title,
      description,
      dateFrom: convertToDate(date, startTime),
      dateTo: convertToDate(date, endTime),
    };

    try {
      const addedEvent = await addEventToBD(newEvent);
      if (addedEvent) {
        setEvents(prevEvents => [
          ...prevEvents,
          {
            ...addedEvent,
            dateFrom: moment.utc(addedEvent.dateFrom).local().toDate(),
            dateTo: moment.utc(addedEvent.dateTo).local().toDate(),
          },
        ]);
      }
    } catch (err) {
      setError('Failed to add event into DB. Please try again later.');
      console.error('Error adding event:', err);
      alert('Failed to add event into DB. Please try again later.');
    }
  };

  const deleteEvent = async eventId => {
    try {
      await deleteEventFromBD(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (err) {
      setError('Failed to delete event. Please try again later.');
      console.error('Error deleting event:', err);
      alert('Failed to delete event. Please try again later.');
    }
  };

  const value = { events, addEventToCalendar, deleteEvent, error };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export default EventProvider;
