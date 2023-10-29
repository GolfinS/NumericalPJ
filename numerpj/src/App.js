import React, { Component } from 'react';
import RootsofEquations from './RootsofEquations';
import LinearAlgebra from './LinearAlgebra';
import Interpolation from './Interpolation';
import LeastSquareRegression from './LeastSquareRegression';
import Integration from './Integration';
import Differentiation from './Differentiation';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: null,
    };
  }

  setActiveComponent = (component) => {
    this.setState({ activeComponent: component });
  };

  render() {
    const { activeComponent } = this.state;
    return (
      <div className="App">
        <h1>Mathematical Calculations</h1>
        <button onClick={() => this.setActiveComponent('RootsofEquations')}>
        Roots of Equations
        </button>
        <button onClick={() => this.setActiveComponent('LinearAlgebra')}>
          Linear Algebra
        </button>
        <button onClick={() => this.setActiveComponent('Interpolation')}>
          Interpolation
        </button>
        <button onClick={() => this.setActiveComponent('LeastSquareRegression')}>
          Least Square Regression
        </button>
        <button onClick={() => this.setActiveComponent('Integration')}>
          Integration
        </button>
        <button onClick={() => this.setActiveComponent('Differentiation')}>
          Differentiation
        </button>
        {activeComponent === 'RootsofEquations' && <RootsofEquations />}
        {activeComponent === 'LinearAlgebra' && <LinearAlgebra />}
        {activeComponent === 'Interpolation' && <Interpolation />}
        {activeComponent === 'LeastSquareRegression' && <LeastSquareRegression />}
        {activeComponent === 'Integration' && <Integration />}
        {activeComponent === 'Differentiation' && <Differentiation />}
      </div>
    );
  }
}

export default App;
