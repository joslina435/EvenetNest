import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./EventGuests.css";
import { getGuestsByEventId, createGuest, deleteGuest, updateGuest } from "../../services/guestService";




function EventGuests() {
    const [guests, setGuests] = useState([]);
    const [isModelOpen, setModelPopup] = useState(false);
    const { eventId } = useParams();
    const [name, setGuestName] = useState("");
    const [email, setGuestEmail] = useState("");
    const [phoneNum, setGuestPhoneNum] = useState("");
    const [rsvpStatus, setRsvpStatus] = useState("Pending");
    const [editingGuest, setEditingGuest] = useState(null);

    useEffect(() => {
        async function loadGuests() {
            try {
                const data = await getGuestsByEventId(eventId);
                setGuests(data);
            } catch (error) {
                console.error("Failed to load guests:", error);
            }
        }

        loadGuests();
    }, [eventId]);

    const handlePopup = () => {
        setModelPopup(true);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const newGuest = {
        //     id: crypto.randomUUID(),
        //     eventId,
        //     name,
        //     email,
        //     phoneNum,
        //     rsvpStatus
        // }
        const guestData = {
            eventId,
            name,
            email,
            phoneNum,
            rsvpStatus
        }
        try {
            if (editingGuest) {
                const updatedGuest = await updateGuest(editingGuest.id, guestData);
                setGuests((currentGuests) => currentGuests.map((guest) => guest.id === editingGuest.id ? updatedGuest : guest))
                console.log("UPDATED GUEST:", updatedGuest);

            }
            else {
                const newGuest = { id: crypto.randomUUID(), ...guestData }
                const createdGuest = await createGuest(newGuest);

                setGuests((currentGuests) => [
                    ...currentGuests,
                    createdGuest
                ]);
            }
            setModelPopup(false);
            setEditingGuest(null);
            setGuestName('')
            setGuestEmail('')
            setGuestPhoneNum('')
            setRsvpStatus('Pending')

        }

        catch (error) {
            console.error('Failed to create guest:', error)
        }

    }

    const handleDelete = async (guestId) => {
        try {
            await deleteGuest(guestId);
            setGuests((currentGuests) =>
                currentGuests.filter((guest) => guest.id !== guestId)
            );
        }
        catch {
            throw Error("Failed to delete")
        }

    }

    const handleEdit = (guest) => {
        setEditingGuest(guest);
        setGuestName(guest.name);
        setGuestEmail(guest.email);
        setGuestPhoneNum(guest.phoneNum);
        setRsvpStatus(guest.rsvpStatus);

        setModelPopup(true);
    }
    return (
        <>
            <p>Here are the Guests</p>

            <button onClick={handlePopup}>+Add Guest Here</button>
            {guests.length === 0 ? (<p>No guests please add Guests</p>) :
                (
                    <div className="card-grid">
                        {guests.map((guest) => (
                            <div key={guest?.id} className="card">
                                <p>{guest?.name}</p>
                                <p>{guest?.email}</p>
                                <p>{guest?.phoneNum}</p>
                                <p>{guest?.rsvpStatus}</p>
                                <div className="buttonContainer">
                                    <button onClick={() => handleEdit(guest)}>Edit Guest</button>

                                    <button onClick={() => handleDelete(guest.id)}>Delete Guest</button>
                                </div>

                            </div>

                        ))}
                    </div>
                )}

            {isModelOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h3>{editingGuest ? "Edit Guest" : "Add Guest"}</h3>

                                <div>
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={(event) => setGuestName(event.target.value)} />
                                </div>
                                <div>
                                    <label>email</label>
                                    <input type="text" value={email} onChange={(event) => setGuestEmail(event.target.value)} />
                                </div>
                                <div>
                                    <label>Phone Num</label>
                                    <input type="tel" value={phoneNum} onChange={(event) => setGuestPhoneNum(event.target.value)} />
                                </div>
                                <div>

                                    <select value={rsvpStatus} onChange={(event) => setRsvpStatus(event.target.value)}>
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Declined">Declined</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit">{editingGuest ? "Update Guest" : "Save Guest"}</button>
                            <button
                                type="button"
                                onClick={() => setModelPopup(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )

            }

        </>
    )
}

export default EventGuests