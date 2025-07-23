import React, { useState } from "react";

const AddPost = ({ token, onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [community, setCommunity] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validate form fields
  if (!title || !community || !content) {
    setError("All fields are required.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, community, content }),
    });

    if (!res.ok) {
      throw new Error("Failed to create post.");
    }

    const newPost = await res.json();

    // Ensure newPost has a comments array so rendering doesn't break
    if (onPostAdded) {
      onPostAdded({ ...newPost, comments: [] });
    }

    // Clear the form
    setTitle("");
    setCommunity("");
    setContent("");
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2><u>Create a New Post</u></h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Community"
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
      />
      <textarea
        type='text'
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default AddPost;