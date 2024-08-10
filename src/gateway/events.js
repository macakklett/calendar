const baseURL = `https://668e5a7bbf9912d4c92dedb5.mockapi.io/api/v1/events`;

export const fetchAllEvents = async () => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addEventToBD = async (event) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error('Failed to add event');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Можна обробити помилку тут або перекинути її далі
    return null;
  }
};

export const deleteEventFromBD = async (eventId) => {
  try {
    const response = await fetch(`${baseURL}/${eventId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete event');
    }

    // return await response.json();
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
