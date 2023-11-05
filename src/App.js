import React, { Component } from 'react';
import RootOfEquationSubMenu from './Midterm/RootOfEquation/RootOfEquationSubMenu';
import LinearAlgebraSubMenu from './Midterm/LinearAlgebra/LinearAlgebraSubMenu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRootOfEquationSubMenuActive: false,
      isLinearAlgebraSubMenuActive: false,
    };
  }

  toggleSubMenu = (submenu) => {
    this.setState((prevState) => ({
      isRootOfEquationSubMenuActive: submenu === 'RootOfEquation' ? !prevState.isRootOfEquationSubMenuActive : prevState.isRootOfEquationSubMenuActive,
      isLinearAlgebraSubMenuActive: submenu === 'LinearAlgebra' ? !prevState.isLinearAlgebraSubMenuActive : prevState.isLinearAlgebraSubMenuActive,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Numerical Calculations</h1>
        <ul>
          <li>
            <button onClick={() => this.toggleSubMenu('RootOfEquation')}>
              Root of Equation
            </button>
          </li>
          <li>
            <button onClick={() => this.toggleSubMenu('LinearAlgebra')}>
              Linear Algebra
            </button>
          </li>
        </ul>

        {this.state.isRootOfEquationSubMenuActive && (
          <RootOfEquationSubMenu toggleSubMenu={() => this.toggleSubMenu('RootOfEquation')} />
        )}

        {this.state.isLinearAlgebraSubMenuActive && (
          <LinearAlgebraSubMenu toggleSubMenu={() => this.toggleSubMenu('LinearAlgebra')} />
        )}

      </div>
    );
  }
}

export default App;
