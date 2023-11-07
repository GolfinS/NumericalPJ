import React, { useState } from "react";
import { det } from "mathjs";
import "./styles.css"; // Import the CSS file

const CramerRule = () => {
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
    
    // Ensure the selected size is within the limit (1 to maxMatrixSize)
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
    const matrixA = [];
    const matrixB = [];

    for (let i = 0; i < numRows; i++) {
      matrixA[i] = [];
      for (let j = 0; j < numRows; j++) {
        matrixA[i][j] = parseFloat(matrix[i][j]);
      }
      matrixB[i] = parseFloat(matrix[i][numRows]);
    }

    const detA = det(matrixA);

    const detX = [];
    for (let i = 0; i < matrixB.length; i++) {
      const newArr2D = JSON.parse(JSON.stringify(matrixA));
      for (let j = 0; j < matrixA.length; j++) {
        newArr2D[j][i] = matrixB[j];
      }
      detX.push(det(newArr2D));
    }

    const solutions = detX.map((det, index) => {
      return det / detA;
    });

    setResult(solutions);
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
    <div className="cramers-rule">
        <h2>Cramer'rule</h2>
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

export default CramerRule;
