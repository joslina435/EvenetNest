// import { Link } from "react-router"

import { useNavigate, Link } from "react-router"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/AuthSlice";
import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";


function Dashboard() {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        async function loadEvents() {
            const data = await getEvents();
            const myEvents = data.filter((event) => event.userId === user.id)
            setEvents(myEvents);
        }
        loadEvents();
    }, [user])

    const handleClick = () => {
        navigate('/events')
    }
    const handlelogout = () => {
        dispatch(logout());
        navigate('/login');

    }
    const handleCreateEvent = () => {
        navigate('/createEvent');
    }
    return (
        <>
            <div>Welcome {user?.name}</div>
            {/* <Link to="/events">Go To Events</Link> */}
            <button onClick={handleClick}>Go To Events</button>

            <div>
                <h3>My Events</h3>
                <div className="card-grid">
                    {events.map((event) => {
                        return (
                            <div key={event.id} className="card">
                                <Link to={`/events/${event.id}`}> {event.name}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button type="button" onClick={handleCreateEvent}>Create Event</button>
            </div>

            <button onClick={handlelogout} >Logout</button>

        </>
    )
}

export default Dashboard