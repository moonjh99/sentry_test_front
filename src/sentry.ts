import * as Sentry from "@sentry/react";
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

console.log("VITE_SENTRY_DSN =", import.meta.env.VITE_SENTRY_DSN);

Sentry.init({
  // 프로젝트 식별
  dsn: SENTRY_DSN,
  environment: "demo",
  release: "sentry-demo@1.0.0",

  // 데모에서는 항상 활성화
  enabled: true,

  // 전체 화면 이동 기준 성능만 수집
  tracesSampleRate: 0,

  // 수집 조건 제어
  beforeSend(event) {
    console.log(event.user);

    // 회원만 수집
    if (!event.user?.id) {
      return null;
    }

    // API 에러 제외
    const isApiError = event.exception?.values?.some((v) =>
      v.stacktrace?.frames?.some(
        (f) =>
          f.filename?.includes("axios") ||
          f.filename?.includes("fetch") ||
          f.filename?.includes("/api/")
      )
    );

    if (isApiError) {
      return null;
    }

    return event;
  },
});
