import { useState } from "react";

function EventForm(){
    const [username, setUsername] = useState("");
    const [body, setBody] = useState("");
    const [user_id, setUser_id] = useState("");
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null);

    try {
        const res = await fetch(`${baseUrl}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`},
            body: JSON.stringify({username, body, user_id: Number(user_id)}),
        });

        if (res.ok) {
            const data = await res.json();
            setUsername("");
            setBody("");
            setUser_id("");
        } else{
            console.error("Failed to create event");
        }
    } catch(err){
        console.error(err);
    }}

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    required
                />

                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    required
                />

                <label>User ID:</label>
                <input
                    type="number"
                    onChange={(event) => setUser_id(event.target.value)}
                    value={user_id}
                    required
                />

                <button type="submit">Create Event</button>
            </div>
        </form>
    )
}

export default EventForm