import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

async function wakeBackend() {
  try {
    await axios.get(import.meta.env.VITE_API_BASE_URL + "/api/health");
    console.log("Render backend awakened");
  } catch (err) {
    console.error("Backend not reachable:", err.message);
  }
}

await wakeBackend();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
