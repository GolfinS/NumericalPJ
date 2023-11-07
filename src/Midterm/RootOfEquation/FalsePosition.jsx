import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { evaluate } from "mathjs";
import "chart.js/auto";
import "./styles.css";

function IterationChart({ data }) {
  const chartData = {
    labels: data.map((_, index) => (index).toString()),
    datasets: [
      {
        label: "x1",
        data: data.map((row, index) => ({
          x: index + 1, // Start from 1
          y: row.x1,
        })),
        backgroundColor: "rgba(54, 102, 125, 0.2)",
        borderColor: "rgba(54, 102, 125, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        min: 0,
        title: {
          display: true,
          text: "x 1",
        },
      },
      x: {
        type: "linear",
        min: 0,
        title: {
          display: true,
          text: "Iteration",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "False Position Iteration Chart",
        font: {
          size: 20,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

function IterationTable({ data }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>xl</th>
            <th>x1</th>
            <th>xr</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.xlVal.toFixed(7)}</td>
              <td>{row.x1.toFixed(7)}</td>
              <td>{row.xrVal.toFixed(7)}</td>
              <td>{row.errorcheck.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FalsePosition() {
  const [func, setFunc] = useState("(x^4) - 13");
  const [xl, setXl] = useState();
  const [xr, setXr] = useState();
  const [finalx1, setFinalx1] = useState(0);
  const [tolerance, setTolerance] = useState(0.000001);
  const [maxIterations, setMaxIterations] = useState(100);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState(null);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function handleToggleChart() {
    setShowChart(!showChart);
  }

  function calculateFalsePosition(e) {
    e.preventDefault();

    let x1 = 0;
    let x1old = 0;
    let xlVal = parseFloat(xl);
    let xrVal = parseFloat(xr);
    let errorcheck = 1;

    const newData = [];

    for (let i = 0; i < maxIterations && errorcheck > tolerance; i++) {
      const fxr = evaluate(func, { x: xrVal });
      const fxl = evaluate(func, { x: xlVal });

      x1 = ((xlVal * fxr) - (xrVal * fxl)) / (fxr - fxl);
      const fx1 = evaluate(func, { x: x1 });
      
      if (fx1 === 0) {
        break;
      } else if (fx1 * fxr > 0) {
        xrVal = x1;
      } else {
        xlVal = x1;
      }

      if (i > 1) {
        errorcheck = Math.abs((x1 - x1old) / x1) * 100;
      }

      x1old = x1;

      newData.push({ xlVal, xrVal, x1, errorcheck });
    }

    setFinalx1(x1);

    if (newData.length > 0) {
      setData(newData);
      setShowTable(true);
      setShowChart(true); // Hide the chart initially
      setError(null); // Clear any previous error messages
    } else {
      setError("Error: No data to display.");
    }
  }

  return (
    <div className="false-position-calculator">
      <h2>False Position Calculator</h2>
      <form onSubmit={calculateFalsePosition}>
        <input
          type="text"
          placeholder="Function"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Lower bound (xl)"
          value={xl}
          onChange={(e) => setXl(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Upper bound (xr)"
          value={xr}
          onChange={(e) => setXr(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Tolerance"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max iterations"
          value={maxIterations}
          onChange={(e) => setMaxIterations(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {data.length > 0 && (
        <div>
          <h3>X1 = {finalx1.toFixed(6)}</h3>
          {error && <div className="error">{error}</div>}
          <button onClick={handleToggleTable}>
            {showTable ? "Hide Table" : "Show Table"}
          </button>
          <button onClick={handleToggleChart}>
            {showChart ? "Hide Chart" : "Show Chart"}
          </button>
        </div>
      )}
      {showTable && <IterationTable data={data} />}
      {showChart && <IterationChart data={data} />}
    </div>
  );
}

export default FalsePosition;
