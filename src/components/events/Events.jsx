import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "./EventForm";
import { baseUrl } from "../../api/eventsIndex.js";

function Events(){
    const [getEvents, setGetEvents] = useState({});
    const { id } = useParams();

    // const baseUrl = import.meta.env.VITE_API_URL;
    const url = baseUrl;

    useEffect(()=>{
        const getAllEvents = async() => {
            try{
                const res = await fetch(`${url}/events`);
                const result = await res.json();
                console.log('fetched events:', result)
                setGetEvents(result);
            } catch (err){
                console.error({error: 'Error fetching events:'});
            }
        }
        getAllEvents();
    }, [])

    return(
        <>
        <div>
            <h1>Events</h1>
        </div>

        <div>
            {Array.isArray(getEvents) && getEvents.length > 0 ? (
                getEvents.map((event) => (
                    <div key={event.id} style={{ marginBottom: "1rem" }}>
                        <h2>{event.username}</h2>
                        <h3>{event.body}</h3>
                        <h4>{event.created_at}</h4>
                    </div>
                ))
            ) : (
                <p>No events to show.</p>
            )}
        </div>


{/* AUTHENTICATED USERS ONLY */}
        <div>
            {/* {token ? (
                <EventForm />
            ) : (
                <p>Please log in to create an event
                )}    */}
        </div>

        <div>
            <button>Create Event Post</button>
            <button>Edit Post</button>
        </div>
        </>
    )
}

export default Events;