export async function getExpenseByEventId(eventId) {
    const response = await fetch(`http://localhost:3001/budget?eventId=${eventId}`);
    if (!response.ok) {
        throw Error("failed to load budget");
    }

    return response.json();
}

export async function createExp(exp) {
    const response = await fetch(`http://localhost:3001/budget`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(exp)
    });

    if (!response.ok) {
        throw Error("Failed to crate budget expenditure");

    }
    return response.json();
}

export async function updateExp(expId, updatedExp) {
    const response = await fetch(`http://localhost:3001/budget/${expId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExp)
    })
    if (!response.ok) {
        throw Error("Failed to update expenditure");
    }
    return response.json();
}