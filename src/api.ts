import axios, { AxiosError } from "axios";

/**
 * 공통 Axios 인스턴스
 * - 모든 API 요청은 이 인스턴스를 사용
 * - Sentry는 절대 여기서 호출하지 않음
 */
export const api = axios.create({
  baseURL: "http://localhost:9090/api",
  timeout: 5000,
  withCredentials: true,
});

/**
 * Response Interceptor
 * ❗ 핵심 포인트
 * - 서버 에러는 여기서 "소비"만 하고
 * - Sentry.captureException 을 절대 호출하지 않음
 */
api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;

    // 보고용 로그 (서버 에러는 서버 로그로만 확인)
    if (status && status >= 500) {
      console.error("[SERVER ERROR]", {
        url: error.config?.url,
        status,
      });
    }

    // ❗ Sentry로 던지지 않음
    // ❗ 그냥 호출자에게 전달
    return Promise.reject(error);
  }
);
