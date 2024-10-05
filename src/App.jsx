import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

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
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("ALL");
  const [countries, setCountries] = useState([]);
  const [experiment, setExperiment] = useState("ALL");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/data.csv")
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const codes = [];
    data.map((row) => {
      const code = row["Alpha 3 Code"];
      if (code !== codes[codes.length - 1]) codes.push(code);
    });
    setCountries(codes);
  }, [data]);

  useEffect(() => {
    if (country === "ALL") {
      setFilteredData(data);
    } else {
      const filter = data.filter((row) => {
        const code = row["Alpha 3 Code"];
        return code === country;
      });
      setFilteredData(filter);
    }
  }, [country]);

  const barData = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Rivers CO2 Emissions (TgCO2)",
        data: filteredData.map((row) => {
          return row["Rivers (TgCO2)"];
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Wood + Crop CO2 Emissions (TgCO2)",
        data: filteredData.map((row) => {
          return row["Wood+Crop (TgCO2)"];
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Fossil Fuels CO2 Emissions (TgCO2)",
        data: filteredData.map((row) => {
          return row["FF (TgCO2)"];
        }),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true, // Allows negative and positive values
        ticks: {
          callback: function (value) {
            return value + " TgCO2"; // Adds units
          },
        },
        title: {
          display: true,
          text: "emissions",
        },
      },
      x: {
        title: {
          display: true,
          text: "year",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "CO2 Emissions Sources",
      },
    },
  };

  const Linedata = {
    labels: [2015, 2016, 2017, 2018, 2019, 2020],
    datasets: [
      {
        label: "IS dC_loss (TgCO2)",
        data: filteredData.map((row) => {
          return row["IS dC_loss (TgCO2)"];
        }),
        borderColor: "rgb(255, 205, 86)",
      },
      {
        label: "LNLG dC_loss (TgCO2)",
        data: filteredData.map((row) => {
          return row["LNLG dC_loss (TgCO2)"];
        }),
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "LNLGIS dC_loss (TgCO2)",
        data: filteredData.map((row) => {
          return row["LNLGIS dC_loss (TgCO2)"];
        }),
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "LNLGOGIS dC_loss (TgCO2)",
        data: filteredData.map((row) => {
          return row["LNLGOGIS dC_loss (TgCO2)"];
        }),
        borderColor: "rgb(153, 102, 255)",
      },
    ],
  };
  const LineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Time Series of CO2 Emissions (dC_loss) from 2015 to 2020",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "dC_loss (TgCO2)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <>
      <nav></nav>
      <div id="dashboard">
        <h1>
          Dataset name: Pilot top-down CO2 Budget constrained by the v10 OCO-2
          MIP Version 1.0
        </h1>

        <select
          name="country"
          id="country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="ALL">ALL</option>
          {countries.map((code, index) => {
            return (
              <option value={code} key={index}>
                {code}
              </option>
            );
          })}
        </select>
        <br />
        <select
          name="experiment"
          id="experiment"
          value={experiment}
          onChange={(event) => setExperiment(event.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="IS">IS</option>
          <option value="LNLG">LNLG</option>
          <option value="LNLGIS">LNLGIS</option>
          <option value="LNLGOGIS">LNLGOGIS</option>
        </select>
        <div>
          <h2>Raw Data</h2>
          {data.length > 0 && (
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, index) => {
                    if (experiment === "ALL") {
                      return <th key={index}>{key}</th>;
                    } else {
                      const words = key.split(/\s+/);
                      if (
                        words.includes(experiment) ||
                        key === "Alpha 3 Code" ||
                        key === "Year"
                      ) {
                        return <th key={index}>{key}</th>;
                      }
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(row).map(([property, value], colIndex) => {
                      if (experiment === "ALL") {
                        return <td key={colIndex}>{value}</td>;
                      } else {
                        const words = property.split(/\s+/); // Split property into words
                        if (
                          words.includes(experiment) ||
                          property === "Alpha 3 Code" ||
                          property === "Year"
                        ) {
                          return <td key={colIndex}>{value}</td>; // Return the column if the condition matches
                        }
                        return null; // Skip columns that don't match
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {country === "ALL" ? (
            <h2>Please select a country to display charts</h2>
          ) : (
            <div>
              <Bar options={barOptions} data={barData} />
              <Line options={LineOptions} data={Linedata} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
