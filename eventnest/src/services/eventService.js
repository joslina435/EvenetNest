export async function getEvents() {

    const response = await fetch('http://localhost:3001/events');


    if (!response.ok) {
        throw new Error('Failed toload ')
    }

    return response.json();
}

export async function createEvent(event) {
    const response = await fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(event),

    })
    if (!response.ok) {
        throw await Error('Failed to create event')
    }

    return response.json()
}

export async function getEventById(eventId) {

    const response = await fetch(`http://localhost:3001/events/${eventId}`);

    if (!response.ok) {
        throw await ("failed to load event");
    }

    return response.json();
}