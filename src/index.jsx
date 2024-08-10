import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import EventProvider from './context/EventContext';

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <EventProvider>
    <App />
  </EventProvider>,
  rootElement
);
