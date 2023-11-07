import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { evaluate } from "mathjs";
import "chart.js/auto";
import "./styles.css";

function GraphicalMethodChart({ fx, xstart, xend }) {
  const step = 0.001;
  const data = [];

  for (let x = parseFloat(xstart); x <= parseFloat(xend); x += step) {
    const y = evaluate(fx, { x });
    data.push({ x, y });
  }

  const chartData = {
    labels: data.map((point) => point.x.toFixed(4)),
    datasets: [
      {
        label: "y",
        data: data.map((point) => point.y),
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
        title: {
          display: true,
          text: "y",
        },
      },
      x: {
        type: "linear",
        title: {
          display: true,
          text: "x",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Graphical Method Chart",
        font: {
          size: 20,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

function GraphicalMethodCalculator() {

  const [fx, setFx] = useState("x - cos(x)");
  const [xstart, setXstart] = useState("0");
  const [xend, setXend] = useState("10");
  const [result, setResult] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState(null);

  function handleToggleChart() {
    setShowChart(!showChart);
  }

  function calculateGraphicalMethod(e) {
    e.preventDefault();
  
    const xStartVal = parseFloat(xstart);
    const xEndVal = parseFloat(xend);
  
    if (isNaN(xStartVal) || isNaN(xEndVal)) {
      setError("Please enter valid start and end values.");
      return;
    }
  
    if (xStartVal >= xEndVal) {
      setError("Start value must be less than end value.");
      return;
    }
  
    try {
      const step = 0.001;
      let x = xStartVal;
      let y = equation(fx, x);
  
      let z = 0;
      while (x <= xEndVal) {
        const nextX = x + step;
        const nextY = equation(fx, nextX);
  
        if (y * nextY < 0) {
          z = x;
          break;
        }
  
        x = nextX;
        y = nextY;
      }
  
      if (z === 0) {
        setError("No solution found in the specified range.");
        return;
      }
  
      x = z;
      let closestRoot = x;
      let closestRootDistance = Math.abs(equation(fx, x));
  
      while (x <= xEndVal) {
        const currentDistance = Math.abs(equation(fx, x));
  
        if (currentDistance < closestRootDistance) {
          closestRoot = x;
          closestRootDistance = currentDistance;
        }
  
        if (equation(fx, x) === 0) {
          setResult(`Solution found: x = ${x}`);
          return;
        }
  
        x += step;
      }
  
      setResult(`Closest solution found: x = ${closestRoot}`);
    } catch (error) {
      setError("Error: Invalid function expression. Please check your function.");
    }
  }
  

  function equation(expression, x) {
    try {
      return evaluate(expression, { x });
    } catch (error) {
      console.error("Invalid function expression:", error);
      return NaN;
    }
  }

  return (
    <div className="graphical-method-calculator">
      <h2>Graphical Method Calculator</h2>
      <form>
        <input
          type="text"
          placeholder="Function (e.g., x - cos(x))"
          value={fx}
          onChange={(e) => setFx(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Start value (xstart)"
          value={xstart}
          onChange={(e) => setXstart(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="End value (xend)"
          value={xend}
          onChange={(e) => setXend(e.target.value)}
        />
        <button onClick={calculateGraphicalMethod}>Calculate</button>
      </form>
      {result && <div>{result}</div>}
      {error && <div className="error">{error}</div>}
      <button onClick={handleToggleChart}>
        {showChart ? "Hide Chart" : "Show Chart"}
      </button>
      {showChart && <GraphicalMethodChart fx={fx} xstart={xstart} xend={xend} />}
    </div>
  );
}

export default GraphicalMethodCalculator;
