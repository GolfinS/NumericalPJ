import React, { useState } from "react";
import "./styles.css";

function IterationTable({ data }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x1</th>
            <th>x2</th>
            <th>x3</th>
            <th>x4</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.x1.toFixed(7)}</td>
              <td>{row.x2.toFixed(7)}</td>
              <td>{row.x3.toFixed(7)}</td>
              <td>{row.x4.toFixed(7)}</td>
              <td>{row.error.toFixed(7)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const JacobiIteration = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numRows + 1 }, () => "")
    )
  );
  const [result, setResult] = useState([]);
  const [iterationData, setIterationData] = useState([]); // Store iteration data
  const maxMatrixSize = 10;

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);

    if (newNumRows >= 1 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(
        Array.from({ length: newNumRows }, () =>
          Array.from({ length: newNumRows + 1 }, () => "")
        )
      );
    } else {
      alert(`Please enter a number between 1 and ${maxMatrixSize}`);
    }
  };

  const handleInputChange = (event, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = event.target.value;
    setMatrix(newMatrix);
  };

  const handleCalculate = () => {
    const A = matrix.map((row) =>
      row.map((value) => parseFloat(value))
    );

    const n = A.length; // The number of equations
    const maxIterations = 100; // Maximum number of iterations
    const errorTolerance = 1e-6; // Tolerance for convergence

    let x = new Array(n).fill(0); // Initial guess for x
    let x_new = [...x]; // Initialize x_new

    const iterationResults = [];

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      let maxError = 0.0;

      for (let i = 0; i < n; i++) {
        let sum = 0.0;

        for (let j = 0; j < n; j++) {
          if (j !== i) {
            sum += A[i][j] * x[j];
          }
        }

        x_new[i] = (A[i][n] - sum) / A[i][i];

        const currentError = Math.abs(((x_new[i] - x[i]) / x_new[i]) * 100);

        if (currentError > maxError) {
          maxError = currentError;
        }
      }

      x = [...x_new];

      // Store iteration data
      iterationResults.push({
        x1: x[0],
        x2: x[1],
        x3: x[2],
        x4: x[3],
        error: maxError,
      });

      // Check for convergence
      if (maxError < errorTolerance) {
        break;
      }
    }

    setResult(x);
    setIterationData(iterationResults);
  };

  const renderTable = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowInputs = [];
      for (let j = 0; j <= numRows; j++) {
        rowInputs.push(
          <input
            key={j}
            type="text"
            value={matrix[i][j]}
            onChange={(event) => handleInputChange(event, i, j)}
            className="matrix-input"
          />
        );
      }
      rows.push(
        <div key={i} className="matrix-row">
          {rowInputs}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="jacobi-iteration">
      <h2>Jacobi Iteration</h2>
      <input
        type="number"
        min="2"
        value={numRows}
        onChange={handleNumRowsChange}
        className="num-rows-input"
      />
      <div className="matrix-container">
        {renderTable()}
        <button className="calculate-button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>
      <div className="final-result">
        {result.length > 0 && (
          <>
            <h3>Final Result</h3>
            {result.map((x, index) => (
              <div key={index} className="final-x">
                {`x${index + 1} = ${x.toFixed(7)}`}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="result-container">
        <IterationTable data={iterationData} />
      </div>
    </div>
  );
};

export default JacobiIteration;
