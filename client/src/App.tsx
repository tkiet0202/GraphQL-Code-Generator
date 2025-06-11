import React from "react";
import { useAllPostsQuery } from "./generated";

function App() {
  const { status, error, data } = useAllPostsQuery();

  if (status === "loading") return <p>loading...</p>;
  if (status === "error")
    return (
      <div>
        Something went wrong: <pre>{JSON.stringify(error)}</pre>
      </div>
    );
  console.log("dataaaaaaaaaa", data);

  return (
    <main>
      <h1>My (over-engineered) Blog</h1>
      <ul>
        {data &&
          data.allPosts &&
          data.allPosts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {post.author.picture && (
                  <img
                    id="profile"
                    src={post.author.picture}
                    alt="Profile picture"
                  />
                )}
                <span>{post.author.displayName}</span>
              </div>
              <small>{new Date(post.publishedAt).toDateString()}</small>
              <article>
                <p>{post.content}</p>
              </article>
              <ul id="comments">
                {post.comments &&
                  post.comments.map((comment: any) => (
                    <li key={comment.id}>
                      <details>
                        <summary>{comment.username}</summary>

                        {comment.text}
                      </details>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
