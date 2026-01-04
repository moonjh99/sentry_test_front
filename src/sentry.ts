import * as Sentry from "@sentry/react";
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

console.log("VITE_SENTRY_DSN =", SENTRY_DSN);

Sentry.init({
  // 프로젝트 식별
  dsn: SENTRY_DSN,
  environment: "demo",
  release: "sentry-demo@1.0.0",

  // 데모에서는 항상 활성화
  enabled: true,

  // 전체 화면 이동 기준 성능만 수집
  tracesSampleRate: 0,

  integrations: [
    // 스택 트레이스 + 성능(선택)
    Sentry.browserTracingIntegration(),

    //n세션 리플레이
    Sentry.replayIntegration({
      maskAllText: false, // 보고용: 텍스트 보이게
      blockAllMedia: false,
    }),
  ],

  // Replay
  replaysSessionSampleRate: 1.0, // 전체 세션 녹화
  replaysOnErrorSampleRate: 1.0, // 에러 발생 시 100%

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
