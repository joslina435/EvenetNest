import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createEvent } from "../../services/eventService";

function CreateEvent() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState('')
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


    const handleSubmit = async (event) => {

        // const user = useSelector((state)=>state.auth.user);

        event.preventDefault();

        const newEvent = {
            userId: user.id,
            name,
            type,
            date,
            location,
            description,
            budget: Number(budget)
        }

        try {
            await createEvent(newEvent)
            navigate('/dashboard');
        }
        catch (error) {
            console.error('Failed to create event', error)

        }

    }

    return (
        <div>
            <h2>Create Your Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Event Name</label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label> Event type</label>
                    <input type="text" value={type} onChange={(event) => setType(event.target.value)} />
                </div>
                <div>
                    <label> Event Location</label>
                    <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <div>
                    <label> Event date</label>
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div>
                    <label> Event Description</label>
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <label> Event Budget</label>
                    <input type="text" value={budget} onChange={(event) => setBudget(event.target.value)} />
                </div>
                <button type="submit">Create Event </button>

            </form>

        </div>
    )
}

export default CreateEvent