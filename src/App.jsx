import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import MainNav from "./components/mainNav";
import Dashboard from "./components/dashboard";
("./components/mainNav");
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  plugins,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  return (
    <>
      <MainNav></MainNav>
      <div id="dashboard">
        <Dashboard></Dashboard>
      </div>
    </>
  );
}

export default App;
