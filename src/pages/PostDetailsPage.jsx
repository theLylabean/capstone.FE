import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PostDetailsPage.css";
export default function PostDetailsPage({ token }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch the post by ID
        const postRes = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!postRes.ok) throw new Error("Failed to fetch post.");
        const postData = await postRes.json();

        // Fetch the comments for the post
        const commentRes = await fetch(
          `http://localhost:3000/api/posts/${id}/comments`
        );
        if (!commentRes.ok) throw new Error("Failed to fetch comments.");
        const commentData = await commentRes.json();

        // Combine post and comments
        setPost({ ...postData, comments: commentData });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setPostError(null);

    const trimmedComment = newComment.trim();
      if (!trimmedComment) {
        setPostError("Comment cannot be empty.");
        return;
      }
    setPosting(true);
    try {
      
      const response = await fetch(
        `http://localhost:3000/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: trimmedComment }),
        }
      );

      if (!response.ok) throw new Error("Failed to add comment.");
      const addedComment = await response.json();

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, addedComment],
      }));

      setNewComment("");
    } catch (error) {
      console.error(error);
      setPostError("Error posting comment.");
    } finally {
      setPosting(false);
    }
  };

  console.log("Post details:", post);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!post) return <div className="error">No post found.</div>;

  return (
    <div className="post-details-page">
      <h1>{post.title}</h1>
      <p>
        <strong>Community:</strong> {post.community}
      </p>
      <p>
        <strong>By:</strong> {post.username}
      </p>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <div className="comments-section">
<<<<<<< HEAD
      {post.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id} className="comment-item">
                <div className="avatar">{comment?.username[0].toUpperCase()}</div>
                <div className="comment-content">
              <strong>{comment?.username}:</strong> {comment?.content}
              </div>
            </li>
            
          ))}
        </ul>
      )}
      {token ? (
        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            required
          />
          <button type="submit" disabled={posting}>
            {posting ? "Posting..." : "Add Comment"}
          </button>
          {postError && <p style={{ color: "red" }}>{postError}</p>}
        </form>
      ) : (
        <p>Please log in to add a comment.</p>
      )}
    </div>
=======
        {post.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="avatar">
                  {comment.username[0].toUpperCase()}
                </div>
                <div className="comment-content">
                  <strong>{comment.username}:</strong> {comment.content}
                </div>
              </li>
            ))}
          </ul>
        )}
        {token ? (
          <form className="comment-form" onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              required
            />
            <button type="submit" disabled={posting}>
              {posting ? "Posting..." : "Add Comment"}
            </button>
            {postError && <p style={{ color: "red" }}>{postError}</p>}
          </form>
        ) : (
          <p>Please log in to add a comment.</p>
        )}
      </div>
>>>>>>> 09e05fff6b033b37360260e6a5d41dc2fa42989a
    </div>
  );
}
