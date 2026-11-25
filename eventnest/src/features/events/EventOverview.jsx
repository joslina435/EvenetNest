import { useOutletContext } from "react-router";

function EventOverview() {

    const { event } = useOutletContext()



    return (
        <div className="card">
            <h3>OverView of Event</h3>
            <p>Event Name :{event?.name}</p>
            <p>Event Type: {event?.type}</p>
            <p>Event Date :{event?.date}</p>
            <p> Event Description: {event?.description}</p>
            <p>Event Budget: {event?.budget}</p>
            <p>Event Location: {event?.location}</p>
        </div>
    )
}

export default EventOverview