import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { Line } from "react-chartjs-2";

function GraphicalMethod() {
  const [func, setFunc] = useState("(x^4) - 13");
  const [xl, setXl] = useState("");
  const [xr, setXr] = useState("");
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    const xlNum = parseFloat(xl);
    const xrNum = parseFloat(xr);

    if (!isNaN(xlNum) && !isNaN(xrNum)) {
      setInputError(null);

      const step = 0.01;
      const xValues = [];
      const yValues = [];

      for (let x = xlNum; x <= xrNum; x += step) {
        xValues.push(x);
        const y = evaluate(func, { x });
        yValues.push(y);
      }

      setGraphData({
        labels: xValues,
        datasets: [
          {
            label: "Graph",
            data: yValues,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      });
    } else {
      setInputError("Invalid input for xl or xr. Please enter valid numbers.");
      setGraphData({ labels: [], datasets: [] });
    }
  }, [xl, xr, func]);

  return (
    <div>
      <h2>Graphical Method</h2>
      <form>
        <input
          type="text"
          placeholder="Function"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <input
          type="text"
          placeholder="XL"
          value={xl}
          onChange={(e) => setXl(e.target.value)}
        />
        <input
          type="text"
          placeholder="XR"
          value={xr}
          onChange={(e) => setXr(e.target.value)}
        />
      </form>
      {inputError && <div className="error">{inputError}</div>}
      <div>
        <h3>Graphical Representation of the Function</h3>
        <Line data={graphData} />
      </div>
    </div>
  );
}

export default GraphicalMethod;
