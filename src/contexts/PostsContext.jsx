/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import * as postsApi from "../api/postsApi";
import { toast } from "react-toastify";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(0);

  useEffect(() => {
  const handleResize = () =>
    setLimit(Math.max(5, Math.floor((window.innerHeight - 250) / 60)));

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// load posts
  const loadPosts = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await postsApi.getPosts(page);
      setPosts(res.items);
      setTotal(res.total);
      setPage(res.page);
    } catch {
      const msg = "Failed to fetch posts";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);
// create post
  const createPost = async (payload) => {
    try {
      setLoading(true);
      const created = await postsApi.createPost(payload);
      setPosts((prev) => [created, ...prev]);
      setTotal((prev) => prev + 1);
      toast.success("Post created");
      return created;
    } catch {
      toast.error("Create post failed");
    } finally {
      setLoading(false);
    }
  };
// update post
  const updatePost = async (id, payload) => {
    try {
      setLoading(true);
      const updated = await postsApi.updatePost(id, payload);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      toast.success("Post updated");
      return updated;
    } catch {
      toast.error("Update post failed");
    } finally {
      setLoading(false);
    }
  };
// delete post
  const deletePost = async (id) => {
    try {
      setLoading(true);
      await postsApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => prev - 1);
      toast.success("Post deleted");
    } catch {
      toast.error("Delete post failed");
    } finally {
      setLoading(false);
    }
  };
// filter
  const filteredPosts = posts.filter((p) =>
    JSON.stringify(p).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PostsContext.Provider
      value={{
        items: filteredPosts,
        rawItems: posts,
        loading,
        error,
        page,
        total,
        query,
        setQuery,
        limit,         
        load: loadPosts,
        create: createPost,
        update: updatePost,
        remove: deletePost,
        setPage: loadPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
