import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { evaluate } from "mathjs";
import "chart.js/auto";
import "./styles.css";

function IterationChart({ data }) {
  const chartData = {
    labels: data.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        label: "xm",
        data: data.map((row) => row.xm),
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
          text: "x m",
        },
      },
      x: {
        type: "category",
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
        text: "Bisection Method Iteration Chart",
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
            <th>xm</th>
            <th>xr</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.xlVal.toFixed(7)}</td>
              <td>{row.xm.toFixed(7)}</td>
              <td>{row.xrVal.toFixed(7)}</td>
              <td>{row.errorcheck.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BisectionMethodCalculator() {
  const [func, setFunc] = useState("(x^4) - 13");
  const [xl, setXl] = useState();
  const [xr, setXr] = useState();
  const [finalxm, setFinalxm] = useState(0);
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

  function calculateBisection(e) {
    e.preventDefault();

    let xm = 0;
    let xmold = 0;
    let xlVal = parseFloat(xl);
    let xrVal = parseFloat(xr);
    let errorcheck = 1;

    const newData = [];

    for (let i = 0; i < maxIterations && errorcheck > tolerance; i++) {
      xm = (xlVal + xrVal) / 2;
      const fxr = evaluate(func, { x: xrVal });
      const fxm = evaluate(func, { x: xm });

      if (fxm === 0) {
        break;
      } else if (fxm * fxr > 0) {
        xrVal = xm;
      } else {
        xlVal = xm;
      }

      if (i > 1) {
        errorcheck = Math.abs((xm - xmold) / xm) * 100;
      }

      xmold = xm;

      newData.push({ xlVal, xrVal, xm, errorcheck });
    }

    setFinalxm(xm);

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
    <div className="bisection-calculator">
      <h2>Bisection Method Calculator</h2>
      <form onSubmit={calculateBisection}>
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
          <h3>Xm = {finalxm.toFixed(6)}</h3>
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

export default BisectionMethodCalculator;
