import { useState } from "react";
import * as Sentry from "@sentry/react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { id, pw });
    const memberId = res.data.id;

    auth.login(memberId);

    Sentry.setUser({ id: memberId });
    navigate("/");
  };

  return (
    <div className="card">
      <h2>로그인</h2>
      <input placeholder="아이디" onChange={(e) => setId(e.target.value)} />
      <input
        type="password"
        placeholder="패스워드"
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={login}>로그인</button>

      <button className="link" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </div>
  );
}
