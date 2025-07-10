import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Events(){
    const [getEvents, setGetEvents] = useState([]);
    const { id } = useParams();

    const baseUrl = 'http://localhost:5173/api';

    useEffect(()=>{
        const getEvents = async() => {
            try{
                const res = await fetch(`${baseUrl}/events`);
                const result = await res.json();
                setGetEvents(result);
            } catch (err){
                console.error({error: 'Error fetching events:'});
            }
        }
        getEvents();
    }, [])

    return(
        <>
        <div>
            <h1>Events</h1>
        </div>

        {/* <div>
            <h2>{Events.username}</h2>
            <h3>{Events.body}</h3>
            <h3>{Events.timestamp}</h3>
        </div> */}
        </>
    )
}

export default Events;