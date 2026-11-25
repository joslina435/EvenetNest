import { useEffect, useReducer, useState } from "react";
import { useParams } from 'react-router';
import { createTask, deleteTask, getTasksByEvenetId, updateTask } from "../../services/tasksService";

const initialState = {
    tasks: [],
    loading: true,
    error: null
}




function taskReducer(state, action) {
    switch (action.type) {
        case 'LOAD-TASKS':
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case 'ADD-TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    return task.id === action.payload.id ? action.payload : task
                })
            }
        case 'DELETE-TASK':
            return {
                ...state, tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        default:
            return state
    }
}
function EventTasks() {
    const { eventId } = useParams();
    const [state, dispatch] = useReducer(
        taskReducer, initialState
    )
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Pending");
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const openTaskForm = () => {
        setIsEditModeOn(false);
        setEditingTask(null);
        setTitle("");
        setAssignee("");
        setPriority("Medium");
        setStatus("Pending");
        setIsTaskFormOpen(true);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editingTask) {
                const updatedTaskData = {
                    title, assignee, priority, status
                }
                const updatedTask = await updateTask(editingTask.id, updatedTaskData);

                dispatch({
                    type: 'UPDATE-TASK',
                    payload: updatedTask
                })
                setIsTaskFormOpen(false);
                setEditingTask(null);
                setIsEditModeOn(false);
            }
            else {
                const taskData = {
                    id: crypto.randomUUID(),
                    eventId,
                    title,
                    assignee,
                    priority,
                    status
                }
                const newTask = await createTask(taskData);
                dispatch({
                    type: 'ADD-TASK',
                    payload: newTask
                })
                setIsTaskFormOpen(false);
                setEditingTask(null);
            }


        }
        catch {
            throw Error("failed to create task");
        }
    }
    const handleUpdate = (task) => {
        setIsEditModeOn(true);
        setEditingTask(task);
        setTitle(task?.title);
        setPriority(task?.priority);
        setAssignee(task?.assignee);
        setStatus(task?.status);
        setIsTaskFormOpen(true);

    }

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);

            dispatch({
                type: 'DELETE-TASK',
                payload: taskId

            })
        }
        catch {
            throw Error("failed to delete task");
        }
    }
    useEffect(() => {
        async function loadTasks() {
            const data = await getTasksByEvenetId(eventId);
            dispatch({
                type: 'LOAD-TASKS',
                payload: data
            })
        }

        loadTasks();
    }, [eventId])

    return (
        <div>
            <p>Your Tasks are Here : </p>
            <button onClick={openTaskForm}>Add Task</button>
            {state.tasks.length === 0 ? (<p>No tasks to display</p>) : (
                state.tasks.map((task) => (
                    <div key={task?.id}>
                        <p>Task Title :{task?.title}</p>
                        <p> Task Assignee :{task?.assignee}</p>
                        <p>Task Priority :{task?.priority}</p>
                        <p>Task Status:{task?.status}</p>
                        <button onClick={() => { handleUpdate(task) }}>Update Task</button>
                        <button onClick={() => { handleDelete(task.id) }} >Delete TASK</button>
                    </div>
                ))

            )}
            {
                isTaskFormOpen && (

                    <div>
                        {/* <h3>Add Task</h3> */}
                        {isEditModeOn ? <h3>Update Task</h3> : <h3>Add Task</h3>}

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Title</label>
                                <input type="text" value={title} onChange={(event) => setTitle(event?.target?.value)} />
                            </div>
                            <div>
                                <label>Assignee</label>
                                <input type="text" value={assignee} onChange={(event) => setAssignee(event?.target?.value)} />
                            </div>
                            <div>
                                <label>Priority</label>
                                <select value={priority} onChange={(event) => setPriority(event?.target?.value)}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label>Status</label>
                                <select value={status} onChange={(event) => setStatus(event?.target?.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <button type="submit">
                                {isEditModeOn ? "Update Task" : "Add Task"}
                            </button>
                        </form>


                    </div>
                )
            }
        </div>
    )
}

export default EventTasks