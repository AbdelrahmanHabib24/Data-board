/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import * as usersApi from "../api/usersApi";
import { toast } from "react-toastify";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");

  const loadUsers = useCallback(async (page) => {
    setLoading(true);
    try {
      const res = await usersApi.getUsers(page);
      setUsers(res.items);
      setTotal(res.total);
      setPage(res.page);
    } catch {
      const msg = "Failed to fetch users";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers(1);
  }, [loadUsers]);

  const createUser = async (payload) => {
    try {
      setLoading(true);
      const created = await usersApi.createUser(payload);
      setUsers((prev) => [created, ...prev]);
      setTotal((prev) => prev + 1);
      toast.success("User created");
      return created;
    } catch {
      toast.error("Create user failed");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, payload) => {
    try {
      setLoading(true);
      const updated = await usersApi.updateUser(id, payload);
      setUsers((prev) => prev.map((x) => (x.id === id ? updated : x)));
      toast.success("User updated");
      return updated;
    } catch {
      toast.error("Update user failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await usersApi.deleteUser(id);
      setUsers((prev) => prev.filter((x) => x.id !== id));
      setTotal((prev) => prev - 1);
      toast.success("User deleted");
    } catch {
      toast.error("Delete user failed");
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) =>
    JSON.stringify(u).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <UsersContext.Provider
      value={{
        items: filtered,
        rawItems: users,
        loading,
        error,
        page,
        total,
        query,
        setQuery,
        load: loadUsers,
        create: createUser,
        update: updateUser,
        remove: deleteUser,
        setPage: loadUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
