import { useState, useEffect } from "react";
import { baseUrl } from "../../api/eventsIndex.js";
import { jwtDecode } from "jwt-decode";
import "../../css/EventsResource.css";
// import "../../css/lighthaven.css";
import logo from '../../images/logo.png';

function Events() {
  const [events, setEvents] = useState([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editBody, setEditBody] = useState("");

  const token = localStorage.getItem("token");
  const url = baseUrl;

  const decoded = token ? jwtDecode(token) : null;
  const user_id = decoded?.id;
  const username = decoded?.username;

  const fetchEvents = async () => {
      try {
          const res = await fetch(`${url}/events`);
          const data = await res.json();
          setEvents(data);
        } catch (err) {
            console.error("Error fetching events:", err);
            setEvents([])
        }
    };

    useEffect(() => {
        fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${url}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, body, user_id: Number(user_id) }),
      });

      if (res.ok) {
        setBody("");
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the event.");
    }
  };
  
  const handleEdit = (id, body) => {
      setEditId(id);
      setEditBody(body);
    };
    
    const handleUpdate = async (id) => {
        try {
            const res = await fetch(`${url}/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ body: editBody, user_id: Number(user_id), username: username, }),
            });
            
            if (res.ok) {
                const updated = await res.json();
                setEvents((prev) =>
                    prev.map((event) => (event.id === id ? updated : event))
            );
            setEditId(null);
            setEditBody("");
        } else {
            alert("Failed to update event.");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while updating the event.");
    }
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(`${url}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } else {
      alert("Failed to delete event.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the event.");
  }
};

  return (
    <div className="events-page-container">
      <div className='events-logo-container'>
        <img src={logo} alt='Logo' />
      </div>
      <h1><u>Events</u></h1>
      <div className='events-rainbow-line' />
      <div className="events-posts-list">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div className="events-post-card" key={event.id} style={{ marginBottom: "1rem" }}>
              <h2><u>{event.username}</u></h2>

              {editId === event.id ? (
                <>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(event.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{event.body}</h3>
                  <h4>{new Date(event.created_at).toLocaleDateString()}</h4>
                  {event.user_id === user_id && (
                    <div>
                      <button onClick={() => handleEdit(event.id, event.body)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(event.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No events to show.</p>
        )}
      </div>
      {token ? (
        <form className="add-events-form" onSubmit={handleSubmit}>
          <label>Event Description:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <button type="submit">Create Event</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <p>Please log in to create an event.</p>
      )}
    </div>
  );
}

export default Events;