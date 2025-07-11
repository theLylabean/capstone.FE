import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllPostsPages() {
  const [posts, setPosts] = useState([]);
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
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-posts-page">
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>
                {post.community} community - by {post.username}
              </p>
              <p>{post.content}</p>
              {/* <p>{post.content.slice(0, 100)}...</p> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
