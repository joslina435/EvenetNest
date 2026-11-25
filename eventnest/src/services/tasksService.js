export async function getTasksByEvenetId(eventId) {
    const response = await fetch(`http://localhost:3001/tasks?eventId=${eventId}`);

    if (!response.ok) {
        throw Error("Failed to load Tasks");

    }
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if (!response.ok) {
        throw Error("failed to create task");
    }

    return response.json();
}

export async function updateTask(taskId, updatedTask) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    })

    if (!response.ok) {
        throw Error('Failed to update');
    }
    return response.json();
}

export async function deleteTask(taskId) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw Error("failed to delete task")

    }
    return response.json();

}