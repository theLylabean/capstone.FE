import { useEffect, useState } from "react";
import { baseUrl } from "../../api/eventsIndex.js";
import { jwtDecode } from "jwt-decode";

function Resources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // For editing

  // const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl;
    
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const user_id = decoded?.id;

  const getResources = async () => {
    try {
      const res = await fetch(`${baseUrl}/resources`);
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, user_id: Number(user_id) }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();

      if (editingId) {
        setResources();
        setEditingId(null);
      }

      setTitle("");
      setBody("");
      setEditingId(null);

      await getResources();

    } catch (err) {
      console.error(err);
      setError("Submission failed");
    }
  };

  const handleEdit = (resource) => {
    setEditingId(resource.id);
    setTitle(resource.title);
    setBody(resource.body);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/resources/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");
      await getResources();

    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  return (
    <div className="all-posts-page">
      <h1>Resources</h1>

      <div className="posts-list">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <div className="post-card" key={resource.id}>
              <h2>{resource.title}</h2>
              <h3>{resource.body}</h3>

              {user_id === resource.user_id && token && (
                <div>
                  <button onClick={() => handleEdit(resource)}>Edit</button>
                  <button onClick={() => handleDelete(resource.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No resources to show</p>
        )}
      </div>

      {/* AUTHENTICATED USERS ONLY */}
      <div>
        {token ? (
          <form className="comment-form" onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>Body:</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <button type="submit">
                {editingId ? "Update Resource" : "Create Resource"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setTitle("");
                    setBody("");
                  }}
                >
                  Cancel
                </button>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </form>
        ) : (
          <p>Please log in to create a resource</p>
        )}
      </div>
    </div>
  );
}

export default Resources;