import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllpostsPage.css"

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
    setPostError(null);

    //will trim the input and check if it's empty

    const trimmedComment = newComment.trim();
    if (!trimmedComment) {
      setPostError("Comment cannot be empty.");
      return;
    }

    setPosting(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: trimmedComment[postId] }),
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
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>
              <strong>Community:</strong> {post.community}
            </p>
            <p>
              <strong>By:</strong> {post.username}
            </p>
            <p>{post.content}</p>

            <div className="comments-section">
              <h4>Comments:</h4>
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
                        <strong>{comment.username}</strong>
                        <p>{comment.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {token ? (
              <form
                className="comment-form"
                onSubmit={(e) => handleAddComment(e, post.id)}
              >
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
                {postError && <p className="error-message">{postError}</p>}
              </form>
            ) : (
              <p className="login-prompt">Please log in to add a comment.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
