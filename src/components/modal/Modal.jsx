import React, { useState } from 'react';
import moment from 'moment';

import './modal.scss';
import { useEvents } from '../../hook/useEvents';

const Modal = (props) => {
  if (!props.isModalOpen) return null;
  const { addEventToCalendar } = useEvents();

  const { selectedDate, selectedTime, closeModalWindow } = props;

  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate,
    startTime: moment(selectedTime, 'HH:mm')
      .subtract(1, 'hours')
      .format('HH:mm'),
    endTime: selectedTime,
    description: '',
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addEventToCalendar(formData);
    closeModalWindow();
  };

  const { title, date, startTime, endTime, description } = formData;

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={closeModalWindow}
          >
            +
          </button>
          <form className="event-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={handleChangeFormData}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChangeFormData}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChangeFormData}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChangeFormData}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={handleChangeFormData}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              disabled={!title || !date || !startTime || !endTime}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
