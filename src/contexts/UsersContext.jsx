/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
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
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const handleResize = () =>
      setLimit(Math.max(5, Math.floor((window.innerHeight - 250) / 60)));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
// loadUsers
  const loadUsers = useCallback(async (page) => {
    setLoading(true);
    setError(null);
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
// createUser
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
// updateUser
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
// deleteUser
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

  const filteredUsers = users.filter((u) =>
    JSON.stringify(u).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <UsersContext.Provider
      value={{
        items: filteredUsers,
        rawItems: users,
        loading,
        error,
        page,
        total,
        query,
        setQuery,
        limit, 
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
