import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setUser(res.data);
    }).catch(() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.username}</p> : <p>Loading...</p>}
    </div>
  );
}
