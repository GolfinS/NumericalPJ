import React, { useState } from "react";
import "./styles.css";

const GaussJordan = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numRows + 1 }, () => "")
    )
  );
  const [result, setResult] = useState([]);
  const maxMatrixSize = 10;

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);

    if (newNumRows >= 1 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(
        Array.from ({ length: newNumRows }, () =>
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

    let X = [];
    let Ratio;
    for (var i = 0; i < A.length; i++) {
      if (A[i][i] === 0.0) {
        console.log("Matrix Error!!");
        break;
      }
      for (let j = 0; j < A.length; j++) {
        if (i !== j) {
          Ratio = A[j][i] / A[i][i];

          for (let k = 0; k < A.length + 1; k++) {
            A[j][k] = A[j][k] - Ratio * A[i][k];
          }
        }
      }
    }
    for (let i = 0; i < A.length; i++) {
      X[i] = A[i][A.length] / A[i][i];
    }
    setResult(X);
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
    <div className="Lu-decomposition">
        <h2>Lu Decomposition Method</h2>
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
        {result.map((res, index) => (
          <div key={index} className="result">
            {`x${index + 1} = ${res}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaussJordan;
