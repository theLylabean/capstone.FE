import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddPost from "./Addpost";
import HoverFollow from '../components/follows/HoverFollow.jsx';
import logo from '../images/logo.png';
import "./AllpostsPage.css";

export default function AllPostsPage({ currentUser, token }) {
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
        console.log("🚨 postsData:", postsData);
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

    const commentForPost = newComment[postId]?.trim();
    if (!commentForPost) {
      setPostError((prev) => ({
        ...prev,
        [postId]: "Comment cannot be empty.",
      }));
      return;
    }

    setPosting((prev) => ({ ...prev, [postId]: true }));
    setPostError((prev) => ({ ...prev, [postId]: "" }));

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentForPost }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      // ✅ Fetch updated comments for just this post
      const updatedCommentsRes = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`
      );
      const updatedComments = await updatedCommentsRes.json();

      // ✅ Update only the comments array for this post
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === postId ? { ...post, comments: updatedComments } : post;
        })
      );
      
      // If you want to log the updated post, do it here:
      console.log('POST:', prevPosts.find(post => post.id === postId));

      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
      setPostError((prev) => ({
        ...prev,
        [postId]: "Error posting comment.",
      }));
    } finally {
      setPosting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  if (loading) return <div>Loading posts....</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('currentUser:', currentUser);
console.log('post.userId:', posts.user_id);
console.log('post.username:', posts.username);
console.log('All posts:', posts);

  return (
    <div className="all-posts-page">
      <div>
        <div className='logo-container'>
          <img src={logo} alt='Logo' />
        </div>
        <h1 className="lighthaven">Welcome to LightHaven
          <h6 className="lighthaven">Your safe space to share, grow, and shine together.</h6>
        </h1>
        </div>
        <h2>All Posts</h2>
        {token && (
          <AddPost
            token={token}
            onPostAdded={(newPost) => setPosts([newPost, ...posts])}
          />
        )}
        <div className="posts-list">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>
                <strong>Community:</strong> {post.community}
              </p>
              {currentUser?.id !== post.user_id && (
                <HoverFollow targetUserId={post.user_id}>
                  <p>
                    <strong>By:</strong>{" "}
                    <span className="follow-user">{post.username}</span>
                  </p>
                </HoverFollow>
              )}
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
                          {comment.username[0]?.toUpperCase()}
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
                      setNewComment((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Add your comment..."
                    required
                  />
                  <button type="submit" disabled={posting[post.id]}>
                    {posting[post.id] ? "Posting..." : "Add Comment"}
                  </button>
                  {postError[post.id] && (
                    <p className="error-message">{postError[post.id]}</p>
                  )}
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
