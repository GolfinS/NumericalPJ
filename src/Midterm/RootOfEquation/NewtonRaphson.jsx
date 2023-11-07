import React, { useState } from "react";
import { evaluate, derivative } from "mathjs";
import "./styles.css";

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
              <td>{row.xVal.toFixed(7)}</td>
              <td>{row.error.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewtonRaphson() {
  const [func, setFunc] = useState("x^2 - 7");
  const [x, setX] = useState();
  const [finalx, setFinalx] = useState(0);
  const [tolerance, setTolerance] = useState(0.000001);
  const [maxIterations, setMaxIterations] = useState(100);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function calculateNewtonRaphson(e) {
    e.preventDefault();

    let xVal = parseFloat(x);
    let xValold = 0;

    const newData = [];

    for (let i = 0; i < maxIterations; i++) {
      const fX = evaluate(func, { x: xVal });
      const diffX = evaluate(derivative(func, 'x').toString(), { x: xVal });

      xVal = xVal - fX / diffX;

      const error = Math.abs(xVal - xValold);

      newData.push({ xVal, error });
      xValold = xVal;

      if (error < tolerance) {
        break;
      }
    }

    setFinalx(xVal);

    if (newData.length > 0) {
      setData(newData);
      setShowTable(true);
      setError(null); // Clear any previous error messages
    } else {
      setError("Error: No data to display.");
    }
  }

  return (
    <div className="Newton-Raphson">
      <h2>Newton-Raphson Method Calculator</h2>
      <form onSubmit={calculateNewtonRaphson}>
        <input
          type="text"
          placeholder="Function"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
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
          <h3>x = {finalx.toFixed(7)}</h3>
          {error && <div className="error">{error}</div>}
          <button onClick={handleToggleTable}>
            {showTable ? "Hide Table" : "Show Table"}
          </button>
        </div>
      )}
      {showTable && <IterationTable data={data} />}
    </div>
  );
}

export default NewtonRaphson;
