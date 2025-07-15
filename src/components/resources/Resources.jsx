import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Resources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // For editing

  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_URL;

  const decoded = token ? jwtDecode(token) : null;
  const user_id = decoded?.id;

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await fetch(`${baseUrl}/resources`);
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error(err);
      }
    };
    getResources();
  }, [baseUrl]);

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
      setResources();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  return (
    <>
      <h1>RESOURCES</h1>

      <div>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id}>
              <h2>{resource.title}</h2>
              <h3>{resource.body}</h3>
              <h4>{new Date(resource.created_at).toLocaleDateString()}</h4>

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
          <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default Resources;