import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <input placeholder="User ID"
        onChange={e => setForm({ ...form, userId: e.target.value })} />
      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={signup}>Signup</button>
      <p onClick={() => navigate("/login")}>Already have an account? Login</p>
    </div>
  );
}
