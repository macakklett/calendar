import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

export const useEvents = () => {
  return useContext(EventContext);
};
