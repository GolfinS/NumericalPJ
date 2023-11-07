import React, { useState } from "react";
import { evaluate, derivative, factorial } from "mathjs";
import "./styles.css";

function IterationTable({ data }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>pX</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.pX.toFixed(7)}</td>
              <td>{row.errorcheck.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaylorSeries() {
  const [func, setFunc] = useState("log(x)");
  const [x, setX] = useState();
  const [x0, setX0] = useState();
  const [finalx, setFinalx] = useState(0);
  const [tolerance, setTolerance] = useState(0.000001);
  const [maxIterations, setMaxIterations] = useState(100);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function calculateBisection(e) {
    e.preventDefault();

    let xVal = parseFloat(x);
    let x0Val = parseFloat(x0);
    let errorcheck = 1;
    let pX = evaluate(func, { x: x0Val });
    let diffunc = func;

    const newData = [];

    for (let i = 0; i < maxIterations && errorcheck > tolerance; i++) {
      if (i > 0) {
        diffunc = derivative(diffunc, 'x').toString();
        const diffuncn = evaluate(diffunc, { x: x0Val }) * (Math.pow(xVal - x0Val, i) / factorial(i));
        pX += diffuncn;
      }

      const fX = evaluate(func, { x: xVal });

      errorcheck = Math.abs(fX - pX);

      newData.push({ pX, errorcheck });
    }

    setFinalx(pX);

    if (newData.length > 0) {
      setData(newData);
      setShowTable(true);
      setError(null); // Clear any previous error messages
    } else {
      setError("Error: No data to display.");
    }
  }

  return (
    <div className="Taylor-Series">
      <h2>Taylor Series Method Calculator</h2>
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
          placeholder="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="x0"
          value={x0}
          onChange={(e) => setX0(e.target.value)}
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
          <h3>pX = {finalx.toFixed(7)}</h3>
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

export default TaylorSeries;
