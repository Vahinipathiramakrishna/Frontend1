import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  /* =========================
     EFFECT 1: AUTH + ROLE
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  /* =========================
     EFFECT 2: FETCH USERS
  ========================= */
  useEffect(() => {
    if (!role) return; // wait until role is set

    const fetchUsers = async () => {
      const res = await API.get("/users");
      setUsers(res.data);
    };

    fetchUsers();
  }, [role]);

  /* =========================
     ADMIN ACTIONS
  ========================= */
  const addUser = async () => {
    await API.post("/users/add-user", form);
    setForm({});
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    const res = await API.get("/users");
    setUsers(res.data);
  };


  const startEdit = (user) => {
    setEditId(user._id);
    setForm(user);
  };

  const updateUser = async () => {
    await API.put(`/users/${editId}`, form);
    setEditId(null);
    setForm({});
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>
        Role: <b>{role}</b>
      </p>
      <button onClick={logout}>Logout</button>

      {/* ADMIN ONLY */}
      {role === "admin" && (
        <>
          <h3>{editId ? "Update User" : "Add User"}</h3>

          <input
            placeholder="User ID"
            value={form.userId || ""}
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
          />
          <input
            placeholder="Name"
            value={form.name || ""}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            placeholder="Password"
            value={form.password || ""}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {editId ? (
            <button onClick={updateUser}>Update</button>
          ) : (
            <button onClick={addUser}>Add</button>
          )}

          <hr />
        </>
      )}

      <h3>User List</h3>
      {users.map((u) => (
        <div key={u._id}>
          {u.userId} | {u.name} | {u.email}

          {role === "admin" && (
            <>
              <button onClick={() => startEdit(u)}>Edit</button>
              <button onClick={() => deleteUser(u._id)}>
                Remove
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
