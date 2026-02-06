/*
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.map((u, i) => (
        <p key={i}>{u.name} - {u.email} -{u.password}</p>
      ))}
    </div>
  );
}

export default App;
  */

/*import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = () => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/add-user", {
      userId,
      name,
      email,
      password
    })
    .then(() => {
      fetchUsers();
      setUserId("");
      setName("");
      setEmail("");
      setPassword("");
    })

    .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        /><br/><br/>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Add User</button>
      </form>

      <hr />

      <h2>Users List</h2>
      {users.map((u) => (
        <div key={u._id}>
          <p>
            ID: {u.userId} <br />
            Name: {u.name} <br />
            Email: {u.email}
          </p>
          <button onClick={() =>{
            console.log("Deleting ID:", u._id);
            axios.delete(`http://localhost:5000/delete-user/${u._id}`)
            .then(() => fetchUsers())
            .catch(err => console.log(err))
          }}>
      Remove
    </button>
  </div>
))} 
    </div>
  );
}

export default App;
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
