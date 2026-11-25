import { Outlet, useParams, Link } from "react-router";
import { getEventById } from "../../services/eventService";
import { useEffect, useState } from "react";

function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function loadEvent() {
            try {
                const data = await getEventById(eventId);
                setEvent(data);
            }
            catch {
                throw Error("failed to load event details")
            }
        }
        loadEvent();
    }, [eventId])

    if (!event) {
        return <p>Loading </p>
    }

    return (
        <>
            Evenet Details
            <p>Event Name :{event?.name}</p>
            {/* <p>Event Type: {event?.type}</p>
            <p>Event Date :{event?.date}</p>
            <p> Event Description: {event?.description}</p>
            <p>Event Budget: {event?.budget}</p>
            <p>Event Location: {event?.location}</p> */}
            <div>
                <nav>
                    <Link to="overview">OverView</Link>

                    |

                    <Link to="guests">Guests</Link>

                    |

                    <Link to="tasks">Tasks</Link>

                    |
                    <Link to="budget">Budget</Link>
                </nav>
            </div>

            <Outlet context={{ event }} />
        </>
    )
}

export default EventDetails