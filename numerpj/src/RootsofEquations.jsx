import React, { Component } from 'react';

class RootsofEquations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: '', // Function input
      xl: '', // XL input
      xr: '', // XR input
      method: 'Graphical Method', // Default selected method
      results: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleMethodChange = (event) => {
    this.setState({ method: event.target.value });
  };

  handleCalculate = () => {
    // Add logic to perform calculations based on the selected method
    const { fx, xl, xr, method } = this.state;

    if (method === 'Graphical Method') {
      // Graphical Method calculations
      const increment = 0.001; // Adjust the increment value
      const maxIterations = 10000; // Adjust the maximum number of iterations
      let x = parseFloat(xl);
      let z = 0;
      let y = this.evaluateFunction(fx, x);
      let results = [];
    
      while (x <= parseFloat(xr) && results.length < maxIterations) {
        const nextY = this.evaluateFunction(fx, x + increment);
        if (y * nextY < 0) {
          z = x + increment;
          results.push(`Solution found: x = ${z.toFixed(6)}`);
          this.setState({ results });
          break;
        }
        x += increment;
        y = nextY;
      }
    
      if (z === 0) {
        results.push('No solution found in the specified range.');
        this.setState({ results });
      } else {
        x = y;
        let closestRoot = 0;
        let closestRootDistance = Math.abs(this.evaluateFunction(fx, x));
    
        while (x <= z) {
          let currentDistance = Math.abs(this.evaluateFunction(fx, x));
          if (currentDistance < closestRootDistance) {
            closestRoot = x;
            closestRootDistance = currentDistance;
          }
          
          if (this.evaluateFunction(fx, x) === 0) {
            results.push(`Closest solution found: x = ${z.toFixed(6)}`);
            this.setState({ results });
            break;
          }
          
          x += increment;
        }
      }

    } else if (method === 'Bisection') {
      // Bisection Method calculations
      let xlNum = parseFloat(xl);
      let xrNum = parseFloat(xr);
      let results = [];
      let ea = 1;
      let iteration = 1;
      const checkerror = 1E-6;
      let xmold = 0;
      const maxIterations = 100;

      do {
        const xm = (xlNum + xrNum) / 2;
        const fxr = this.evaluateFunction(fx, xrNum);
        const fxm = this.evaluateFunction(fx, xm);

        results.push(`Iteration ${iteration}: xl = ${xlNum.toFixed(6)}, xr = ${xrNum.toFixed(6)}, xm = ${xm.toFixed(6)}`);

        if (fxm * fxr > 0) {
          xrNum = xm;
        } else {
          xlNum = xm;
        }

        if (iteration > 1) {
          ea = Math.abs((xm - xmold) / xm);
        }

        xmold = xm;

        iteration++;

        if (ea <= checkerror || iteration > maxIterations) {
          break;
        }
      } while (true);

      this.setState({ results });

    } else if (method === 'False-Position') {
      // Implement False-Position Method calculations here
      let xlNum = parseFloat(xl);
      let xrNum = parseFloat(xr);
      let results = [];
      let ea = 1;
      let iteration = 1;
      const checkerror = 1E-6;
      let xmold = 0;
      const maxIterations = 100;
    
      do {
        const fxl = this.evaluateFunction(fx, xlNum);
        const fxr = this.evaluateFunction(fx, xrNum);
        const xm = xrNum - (fxr * (xlNum - xrNum)) / (fxl - fxr);
        const fxm = this.evaluateFunction(fx, xm);
    
        results.push(`Iteration ${iteration}: xl = ${xlNum.toFixed(6)}, xr = ${xrNum.toFixed(6)}, xm = ${xm.toFixed(6)}`);
    
        if (fxm * fxr > 0) {
          xrNum = xm;
        } else {
          xlNum = xm;
        }
    
        if (iteration > 1) {
          ea = Math.abs((xm - xmold) / xm);
        }
    
        xmold = xm;
    
        iteration++;
    
        if (ea <= checkerror || iteration > maxIterations) {
          break;
        }
      } while (true);
    
      this.setState({ results });
    
    } else if (method === 'One-Point Iteration') {
        // One-Point Iteration calculations
        const maxIterations = 100;
        const checkerror = 1E-6;
        let x0Num = parseFloat(xl); // Initial guess
        let results = [];
        
        for (let iteration = 1; iteration <= maxIterations; iteration++) {
            const x1Num = this.onePointIteration(x0Num, fx);
            results.push(`Iteration ${iteration}: x0 = ${x0Num.toFixed(6)}, x1 = ${x1Num.toFixed(6)}`);

            if (Math.abs(x1Num - x0Num) <= checkerror) {
            results.push(`Converged to a solution: x = ${x1Num.toFixed(6)}`);
            break;
            }
            
            x0Num = x1Num;
        }

        this.setState({ results });

    } else if (method === 'Taylor Series') {
        // Taylor Series calculations
        const maxIterations = 100;
        const checkerror = 1E-6;
        let xNum = parseFloat(xl); // Initial guess
        let results = [];
        
        for (let iteration = 1; iteration <= maxIterations; iteration++) {
            const fx = this.evaluateFunction(fx, xNum);
            const fpx = this.evaluateDerivative(fx, xNum);
            const x1Num = xNum - fx / fpx;

            results.push(`Iteration ${iteration}: x = ${xNum.toFixed(6)}, f(x) = ${fx.toFixed(6)}, f'(x) = ${fpx.toFixed(6)}`);

            if (Math.abs(x1Num - xNum) <= checkerror) {
            results.push(`Converged to a solution: x = ${x1Num.toFixed(6)}`);
            break;
            }

            xNum = x1Num;
        }

        this.setState({ results });

    } else if (method === 'Newton Raphson') {
      // Newton Raphson Method calculations
      const results = [];
      let x0 = parseFloat(xl); // Initial guess
      let iteration = 1;
      const maxIterations = 100;

      do {
        const f_x0 = this.evaluateFunction(fx, x0);
        const f_x0_derivative = this.evaluateFunctionDerivative(fx, x0);

        const x1 = x0 - f_x0 / f_x0_derivative;
        const AbsError = Math.abs((x1 - x0) / x1) * 100;

        results.push(`Iteration ${iteration}: x0 = ${x0.toFixed(6)}, x1 = ${x1.toFixed(6)}`);

        if (AbsError <= 0.000001 || iteration >= maxIterations) {
          break;
        }

        x0 = x1;
        iteration++;
      } while (true);

      this.setState({ results });
      
    } else if (method === 'Secant Method') {
      let x0 = parseFloat(xl); // Initial guess
      let x1 = parseFloat(xr); // Initial guess
      const results = [];
      const maxIterations = 100;

      for (let iteration = 1; iteration <= maxIterations; iteration++) {
          const f_x0 = this.evaluateFunction(fx, x0);
          const f_x1 = this.evaluateFunction(fx, x1);

          const x2 = x1 - (f_x1 * (x1 - x0)) / (f_x1 - f_x0);
          const AbsError = Math.abs((x2 - x1) / x2) * 100;

          results.push(`Iteration ${iteration}: x0 = ${x0.toFixed(6)}, x1 = ${x1.toFixed(6)}`);

          if (AbsError <= 0.000001) {
            results.push(`Approximate root: x = ${x2.toFixed(6)}`);
            break;
        }

          x0 = x1;
          x1 = x2;

        }
        this.setState({ results });
        }
    };

    evaluateFunction = (expression, x) => {
        try {
        // Replace ^ with ** and e with Math.E, then evaluate the expression
        const cleanedExpression = expression.replace(/\^/g, '**').replace(/e/g, Math.E);
        const result = eval(cleanedExpression.replace('x', x));
        return result;
        } catch (error) {
        return NaN; // Handle invalid expressions or evaluation errors
        }
    };

    // Define the One-Point Iteration function
    onePointIteration = (x0, fx) => {
        return this.evaluateFunction(fx, x0);
    };

    // Define the function to evaluate the derivative of f(x)
    evaluateDerivative = (fx, x) => {
        const h = 1E-6; // Small value for calculating the derivative numerically
        const fxPlusH = this.evaluateFunction(fx, x + h);
        const fxMinusH = this.evaluateFunction(fx, x - h);
        return (fxPlusH - fxMinusH) / (2 * h);
    }

  render() {
    const { fx, xl, xr, method, results } = this.state;
    
    return (
        <div className="RootsofEquations">
            <h2>Root of Equations</h2>
        <div>
            <label>
                Enter f(x):
                <input
                    type="text"
                    name="fx"
                    value={fx}
                    onChange={this.handleInputChange}
                />
            </label>
        </div>

        <div>
            <label>
                {method === 'Graphical Method' && 'Enter Xstart'}
                {method === 'Bisection' && 'Enter XL'}
                {method === 'False-Position' && 'Enter XL'}
                {method === 'One-Point Iteration' && 'Enter X0'}
                {method === 'Taylor Series' && 'Enter X'}
                {method === 'Newton Raphson' && 'Enter X0'}
                {method === 'Secant Method' && 'Enter X0'}
                :
            <input
                type="number"
                name="xl"
                value={xl}
                onChange={this.handleInputChange}
            />
            </label>
        </div>

        {method !== 'Newton Raphson' && method !== 'One-Point Iteration' && (
            <div>
                <label>
                    {method === 'Graphical Method' && 'Enter Xend'}
                    {method === 'Bisection' && 'Enter XR'}
                    {method === 'False-Position' && 'Enter XR'}
                    {method === 'Taylor Series' && 'Enter X0'}
                    {method === 'Secant Method' && 'Enter X1'}
                    :
                    <input
                        type="number"
                        name="xr"
                        value={xr}
                        onChange={this.handleInputChange}
                    />
                </label>
            </div>
        )}

        <div>
          <label>
            Select Method:
            <select name="method" value={method} onChange={this.handleMethodChange}>
              <option value="Graphical Method">Graphical Method</option>
              <option value="Bisection">Bisection</option>
              <option value="False-Position">False-Position</option>
              <option value="One-Point Iteration">One-Point Iteration</option>
              <option value="Taylor Series">Taylor Series</option>
              <option value="Newton Raphson">Newton Raphson</option>
              <option value="Secant Method">Secant Method</option>
            </select>
          </label>
        </div>

        <button onClick={this.handleCalculate}>Calculate</button>

        <div>
          <h3>Results:</h3>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default RootsofEquations;
