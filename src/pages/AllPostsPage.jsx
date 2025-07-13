import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllPostsPage({ token }) {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [posting, setPosting] = useState({});
  const [postError, setPostError] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        return response.json();
      })
      .then(async (postsData) => {
        const postsWithComments = await Promise.all(
          postsData.map(async (post) => {
            const commentsRes = await fetch(
              `http://localhost:3000/api/posts/${post.id}/comments`
            );
            const commentsData = await commentsRes.json();
            return { ...post, comments: commentsData };
          })
        );
        setPosts(postsWithComments);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    setPosting(true);
    setPostError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment[postId] }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      const addedComment = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, addedComment] }
            : post
        )
      );
      //setNewComment("");
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
      setPostError("Error posting comment.");
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <div>Loading posts....</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="all-posts-page">
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>
              {post.community} community - by {post.username}
            </p>
            <p>{post.content}</p>

            <h4>Comments:</h4>
            {post.comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.username}:</strong> {comment.content}
                  </li>
                ))}
              </ul>
            )}
            {token ? (
              <form onSubmit={(e) => handleAddComment(e, post.id)}>
                <textarea
                  value={newComment[post.id] || ""}
                  onChange={(e) =>
                    setNewComment({
                      ...newComment,
                      [post.id]: e.target.value,
                    })
                  }
                  placeholder="Add your comment..."
                  required
                />
                <button type="submit" disabled={posting}>
                  {posting ? "Posting..." : "Add Comment"}
                </button>
                {postError && <p style={{ color: "red" }}>{postError}</p>}
              </form>
            ) : (
              <p>Please log in to add comment.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
