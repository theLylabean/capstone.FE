import { useState } from "react";

function ResourceForm(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user_id, setUser_id] = useState("");
    
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null);

    try {
        const res = await fetch(`${baseUrl}/resources`, {
            method: "POST",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify({title, body, user_id: Number(user_id)}),
        });

        if (res.ok){
            const data = await res.json();
            setTitle("");
            setBody("");
            setUser_id("");
        } else{
            console.error("Failed to create resource");
        }
    } catch (err) {
        console.error(err);
    }}

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
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
                    onChange={(event)=> setUser_id(event.target.value)}
                    value={user_id}
                    required
                />

                <button type="submit">Create Resource</button>
            </div>
        </form>
    )
}

export default ResourceForm;