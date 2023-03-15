import React from "react";
import ReactDOM from "react-dom/client";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import App from "./App";
import "normalize.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
