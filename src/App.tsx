import "./App.css";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./sentry";
import Router from "./router";

function App() {
  return (
    <div className="app-root">
      <Router />
    </div>
  );
}

export default App;
