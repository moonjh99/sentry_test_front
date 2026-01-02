import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";
import { auth } from "../auth";
import * as Sentry from "@sentry/react";

export default function MainPage() {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    setMemberId(auth.getMemberId());
  }, []);

  const handleLogout = () => {
    auth.logout();
    Sentry.setUser(null);
    setMemberId(null);
    alert("로그아웃 완료");
  };

  const clientError = () => {
    const fn: any = undefined;

    if (!memberId) {
      alert("클라이언트 에러 발생 (비회원)");
      fn();
    } else {
      alert("클라이언트 에러 발생 (Sentry에서 확인)");
      fn();
    }
  };

  const serverError = async () => {
    try {
      await api.get("/demo/server-error");
    } catch {
      alert("서버 에러 발생 (서버 로그에서만 확인)");
    }
  };

  return (
    <div className="card">
      <h2>메인 페이지</h2>

      {/* 🔹 로그인 / 로그아웃 버튼 */}
      {memberId ? (
        <button onClick={handleLogout}>로그아웃 ({memberId})</button>
      ) : (
        <button onClick={() => navigate("/login")}>로그인</button>
      )}
      <button className="danger" onClick={clientError}>
        클라이언트 에러 발생
      </button>

      <button className="warning" onClick={serverError}>
        서버 에러 발생
      </button>
    </div>
  );
}
