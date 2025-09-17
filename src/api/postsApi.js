const BASE = "https://dummyjson.com";

/** 📄 Get posts */
export async function getPosts(page = 1, pageSize = 8) {
  const skip = (page - 1) * pageSize;
  const res = await fetch(`${BASE}/posts?limit=${pageSize}&skip=${skip}`);
  const data = await res.json();

  return {
    items: data.posts,   
    total: data.total,   
    page,                
    pageSize,           
  };
}

/**Create new post */
export async function createPost(data) {
  const res = await fetch(`${BASE}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/** Update post */
export async function updatePost(id, data) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/** Delete post */
export async function deletePost(id) {
  const res = await fetch(`${BASE}/posts/${id}`, { method: "DELETE" });
  return res.json();
}
