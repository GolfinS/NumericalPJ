import React, { useState } from "react";
import { evaluate } from "mathjs";
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
              <td>{row.x1Val.toFixed(7)}</td>
              <td>{row.error.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SecantMethod() {
  const [func, setFunc] = useState("(x*x) - 7");
  const [x0, setX0] = useState();
  const [x1, setX1] = useState();
  const [finalx1, setFinalx1] = useState(0);
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

    let x0Val = parseFloat(x0);
    let x1Val = parseFloat(x1);


    const newData = [];

    for (let i = 0; i < maxIterations; i++) {
      const fX0 = evaluate(func, { x: x0Val });
      const fX1 = evaluate(func, { x: x1Val });
      const xnVal = x1Val - ((fX1 * (x1Val - x0Val) / (fX1 - fX0)))

      const error = Math.abs((xnVal - x1Val) / xnVal) * 100;

      x0Val = x1Val;
      x1Val = xnVal;

      newData.push({ x1Val, error });

      if (error < tolerance) {
        break;
      }
    }

    setFinalx1(x1Val);

    if (newData.length > 0) {
      setData(newData);
      setShowTable(true);
      setError(null); // Clear any previous error messages
    } else {
      setError("Error: No data to display.");
    }
  }

  return (
    <div className="Secant-Method">
      <h2>Secant Method</h2>
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
          value={x0}
          onChange={(e) => setX0(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="x"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
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
          <h3>x = {finalx1.toFixed(7)}</h3>
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

export default SecantMethod;
