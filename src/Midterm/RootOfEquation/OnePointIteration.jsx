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
        label: "x",
        data: data.map((row, index) => ({
          x: index + 1, // Start from 1
          y: row.x,
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
          text: "x",
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
        text: "One-Point Iteration Chart",
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
            <th>x</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.x.toFixed(7)}</td>
              <td>{row.errorcheck.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OnePointIteration() {
  const [func, setFunc] = useState("(x+1) / 44");
  const [initialGuess, setInitialGuess] = useState(0);
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

  function calculateOnePointIteration(e) {
    e.preventDefault();

    const newData = [];
    let x = initialGuess;
    let errorcheck = 1;

    // Construct the expression string from the user input
    const expressionString = `x = ${func}`;

    for (let i = 0; i < maxIterations && errorcheck > tolerance; i++) {
      // Evaluate the expression string
      const nextX = evaluate(expressionString, { x });
      errorcheck = Math.abs((nextX - x) / nextX) * 100;
      x = nextX;

      newData.push({ x, errorcheck });
    }

    if (newData.length > 0) {
      setData(newData);
      setShowTable(true);
      setShowChart(true);
      setError(null);
    } else {
      setError("Error: No data to display.");
    }
  }

  return (
    <div className="one-point-iteration-calculator">
      <h2>One-Point Iteration Calculator</h2>
      <form onSubmit={calculateOnePointIteration}>
        <input
          type="text"
          placeholder="Function (e.g., x - cos(x))"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Initial Guess"
          value={initialGuess}
          onChange={(e) => setInitialGuess(e.target.value)}
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
          placeholder="Max Iterations"
          value={maxIterations}
          onChange={(e) => setMaxIterations(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {data.length > 0 && (
        <div>
          <h3>Approximate Root = {data[data.length - 1].x.toFixed(6)}</h3>
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

export default OnePointIteration;
