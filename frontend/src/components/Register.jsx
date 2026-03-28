import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate(); 
  const [data, setData] = useState({});

  const handleRegister = async () => {
    await registerUser(data);
    alert("Registered!");
     navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <button onClick={handleRegister}>Register</button>
      <p>
  Already have an account?{" "}
  <button onClick={() => navigate("/login")}>
    Login
  </button>
</p>
    </div>
  );
}