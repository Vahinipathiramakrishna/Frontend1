import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const {
    loginWithRedirect,
    getAccessTokenSilently,
    isAuthenticated,
    user,
    logout
  } = useAuth0();

  /* =========================
     CUSTOM EMAIL/PASSWORD LOGIN
  ========================= */
  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Wrong credentials");
    }
  };

  /* =========================
     AUTH0 → BACKEND LOGIN
  ========================= */
  const auth0BackendLogin = async () => {
  try {
    const auth0Token = await getAccessTokenSilently();

    const res = await API.post(
      "/auth/auth0",
      {},
      {
        headers: {
          Authorization: `Bearer ${auth0Token}`,
        },
      }
    );

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    console.error("AUTH0 ERROR:", err);
    alert("Auth0 login failed");
  }
};


  /* =========================
     UI
  ========================= */
  if (isAuthenticated) {
    return (
      <div className="card">
        <h2>Welcome {user?.name}</h2>
        <p>{user?.email}</p>

        <button onClick={auth0BackendLogin}>
          Continue to Dashboard
        </button>

        <button
          onClick={() =>
            logout({
              logoutParams: { returnTo: window.location.origin }
            })
          }
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Login</h2>

      {/* CUSTOM LOGIN */}
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={login}>Login</button>

      <hr />

      {/* AUTH0 LOGIN */}
      <button
        style={{ background: "#635dff", color: "#fff" }}
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              audience: "https://mern-backend-api",
              scope: "openid profile email",
              prompt: "consent" // 🔥 REQUIRED ON FIRST LOGIN
            }
          })
        }
      >
        Login with Auth0
      </button>

      <p onClick={() => navigate("/signup")}>
        New user? Signup
      </p>
    </div>
  );
}
