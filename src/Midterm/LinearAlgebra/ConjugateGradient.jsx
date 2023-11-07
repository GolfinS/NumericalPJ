import React, { useState } from "react";
import "./styles.css";

const ConjugateGradientMethod = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numRows }, () => "")
    )
  );
  const [result, setResult] = useState([]);
  const maxMatrixSize = 10;

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);

    if (newNumRows >= 1 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(
        Array.from({ length: newNumRows }, () =>
          Array.from({ length: newNumRows }, () => "")
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

    const n = A.length;
    const maxIterations = 100;
    const errorTolerance = 1e-6;

    let x = new Array(n).fill(0);
    let r = new Array(n);
    let p = [...r];

    const result = [];

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      let Ap = new Array(n).fill(0);
      let alpha = 0;
      let rsnew = 0;

      for (let i = 0; i < n; i++) {
        r[i] = 0;
        for (let j = 0; j < n; j++) {
          r[i] += A[i][j] * x[j];
        }
        r[i] = r[i] - A[i][n]; // Subtract b
        p[i] = r[i];
      }

      for (let i = 0; i < n; i++) {
        Ap[i] = 0;
        for (let j = 0; j < n; j++) {
          Ap[i] += A[i][j] * p[j];
        }
        alpha += r[i] * r[i];
      }

      alpha /= Ap.reduce((acc, val, i) => acc + val * p[i], 0);

      for (let i = 0; i < n; i++) {
        x[i] = x[i] + alpha * p[i];
        r[i] = r[i] - alpha * Ap[i];
        rsnew += r[i] * r[i];
      }

      if (Math.sqrt(rsnew) < errorTolerance) {
        break;
      }

      result.push({
        iteration,
        x: [...x],
        error: Math.sqrt(x.reduce((acc, val) => acc + val * val, 0)),
      });
    }

    setResult(result);
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
    <div className="conjugate-gradient-method">
      <h2>Conjugate Gradient Method</h2>
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
      <div className="result-container">
        <table>
          <thead>
            <tr>
              <th>Iteration</th>
              {Array.from({ length: numRows }, (_, index) => (
                <th key={index}>{`x${index + 1}`}</th>
              ))}
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td>{item.iteration + 1}</td>
                {item.x.map((x, i) => (
                  <td key={i}>{x.toFixed(7)}</td>
                ))}
                <td>{item.error.toFixed(7)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConjugateGradientMethod;
