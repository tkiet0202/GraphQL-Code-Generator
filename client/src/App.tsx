import React, { useState } from "react";
import {
  useAuthorQuery,
  useCreatePostMutation,
  useSearchPostsQuery,
} from "./generated";

function App() {
  const { status, error, data } = useAuthorQuery({
    id: 0,
  });
  console.log("dataaaaa", data);

  // Sử dụng useCreatePostMutation để tạo bài viết mới
  const { mutate: createPost } = useCreatePostMutation({
    onSuccess: (data: any) => {
      console.log("Post created:", data?.createPost);
      // Optionally reset form after submission
      setTitle("");
      setContent("");
    },
    onError: (err: any) => {
      console.error("Error creating post", err);
    },
  });

  // Dữ liệu về bài viết tìm kiếm
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchPostsData,
    error: searchError,
    isFetching,
  } = useSearchPostsQuery({
    searchTerm,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Đảm bảo là dữ liệu đã được load trước khi hiển thị
  if (status === "loading") return <p>loading...</p>;
  if (status === "error")
    return (
      <div>
        Something went wrong: <pre>{JSON.stringify(error)}</pre>
      </div>
    );

  // Handle search
  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
  };

  // Handle key press for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Handle form submission for creating post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      authorId: 0, // Bạn có thể thay thế theo tác giả cần thiết
      title,
      content,
    };

    createPost({ input });
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>
        My (over-engineered) Blog
      </h1>

      {/* Centered container for search and create */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Search Section */}
        <div style={{ marginBottom: "30px", width: "100%", maxWidth: 480 }}>
          <h2
            style={{ color: "#333", marginBottom: "15px", textAlign: "center" }}
          >
            Search Posts
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{
                padding: "12px 16px",
                fontSize: "1em",
                border: "2px solid #ddd",
                borderRadius: "8px",
                width: "100%",
                maxWidth: 280,
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4A90E2";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd";
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "12px 24px",
                fontSize: "1em",
                backgroundColor: isFetching ? "#93c5a0" : "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(40, 167, 69, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: isFetching ? 0.8 : 1,
              }}
              onMouseOver={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.backgroundColor = "#218838";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(40, 167, 69, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isFetching
                  ? "#93c5a0"
                  : "#28a745";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(40, 167, 69, 0.3)";
              }}
            >
              {isFetching ? "Searching..." : "🔍 Search"}
            </button>
          </div>
        </div>

        {/* Create Post Form */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
            width: "100%",
            maxWidth: 480,
          }}
        >
          <div
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(74, 144, 226, 0.08)",
              padding: "28px 32px 24px 32px",
            }}
          >
            <h3
              style={{
                color: "#333",
                marginBottom: "15px",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              Create a New Post
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1em",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <div>
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1em",
                    minHeight: "100px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  backgroundColor: "#4A90E2",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Display search results */}
      <div style={{ margin: "40px auto", maxWidth: 700 }}>
        {searchPostsData &&
        searchPostsData.searchPosts &&
        searchPostsData.searchPosts.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {searchPostsData.searchPosts.map((post: any) => (
              <li
                key={post.id}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(74, 144, 226, 0.08)",
                  marginBottom: 28,
                  padding: "24px 28px",
                  background: "#fff",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(74, 144, 226, 0.16)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(74, 144, 226, 0.08)")
                }
              >
                <h3
                  style={{
                    color: "#4A90E2",
                    fontSize: "1.4em",
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: 10,
                    letterSpacing: 0.5,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "#444",
                    fontSize: "1.08em",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {post.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#aaa",
              fontSize: "1.1em",
              margin: "40px 0",
            }}
          >
            No posts found
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
