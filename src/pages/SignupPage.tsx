import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    await api.post("/auth/signup", { id, pw });
    alert("회원가입 완료");
    navigate("/login");
  };

  return (
    <div className="card">
      <h2>회원가입</h2>
      <input placeholder="아이디" onChange={(e) => setId(e.target.value)} />
      <input
        type="password"
        placeholder="패스워드"
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={signup}>회원가입</button>
    </div>
  );
}
