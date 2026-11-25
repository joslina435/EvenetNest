export async function getGuestsByEventId(eventId) {

    const response = await fetch(`http://localhost:3001/guests?eventId=${eventId}`);

    if (!response.ok) {
        throw Error("Failed to load guests")
    }
    return response.json();

}

export async function createGuest(guest) {
    const response = await fetch(`http://localhost:3001/guests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guest)

    })

    if (!response.ok) {
        throw Error("Failed to create guest");
    }
    return response.json();
}

export async function deleteGuest(guestId) {
    const response = await fetch(`http://localhost:3001/guests/${guestId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw Error("failed to delete guest")

    }
    return response.json();

}

export async function updateGuest(guestId, updatedGuest) {
    const response = await fetch(`http://localhost:3001/guests/${guestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGuest)
    });

    if (!response.ok) {
        throw Error("Failed to update guest");
    }
    return response.json();
}


