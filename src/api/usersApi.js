const BASE = "https://dummyjson.com";

export async function getUsers(page = 1, pageSize = 20) {
  const skip = (page - 1) * pageSize;
  const res = await fetch(`${BASE}/users?limit=${pageSize}&skip=${skip}`);
  const data = await res.json();
  
  return {
    items: data.users,   
    total: data.total,   
    page,               
    pageSize,            
  };
}


export async function createUser(data) {
  const res = await fetch(`${BASE}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE}/users/${id}`, { method: "DELETE" });
  return res.json();
}
