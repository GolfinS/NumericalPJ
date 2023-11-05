// RootOfEquationSubMenu.js
import React, { Component } from 'react';
import CramersRule from './CramersRule';
import GaussElimination from './GaussElimination';
import GaussJordan from './GaussJordan';
import MatrixInversion from './MatrixInversion';
import LUDecomposition from './LUDecomposition';
import CholeskyDecomposition from './CholeskyDecomposition';
import JacobiIteration from './JacobiIteration';
import GaussSeidelIteration from './GaussSeidelIteration';
import ConjugateGradient from './ConjugateGradient';

class RootOfEquationSubMenu extends Component {
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
      <div>
        <button onClick={() => this.setActiveComponent('CramersRule')}>
          Cramer's Rule
        </button>
        <button onClick={() => this.setActiveComponent('GaussElimination')}>
          Gauss Elimination
        </button>
        <button onClick={() => this.setActiveComponent('GaussJordan')}>
          Gauss Jordan
        </button>
        <button onClick={() => this.setActiveComponent('MatrixInversion')}>
          Matrix Inversion
        </button>
        <button onClick={() => this.setActiveComponent('LUDecomposition')}>
          LU Decomposition
        </button>
        <button onClick={() => this.setActiveComponent('CholeskyDecomposition')}>
          Cholesky Decomposition
        </button>
        <button onClick={() => this.setActiveComponent('JacobiIteration')}>
          Jacobi Iteration
        </button>
        <button onClick={() => this.setActiveComponent('GaussSeidelIteration')}>
          Gauss Seidel Iteration
        </button>
        <button onClick={() => this.setActiveComponent('ConjugateGradient')}>
          Conjugate Gradient
        </button>
        {activeComponent === 'CramersRule' && <CramersRule />}
        {activeComponent === 'GaussElimination' && <GaussElimination />}
        {activeComponent === 'GaussJordan' && <GaussJordan />}
        {activeComponent === 'MatrixInversion' && <MatrixInversion />}
        {activeComponent === 'LUDecomposition' && <LUDecomposition />}
        {activeComponent === 'CholeskyDecomposition' && <CholeskyDecomposition />}
        {activeComponent === 'JacobiIteration' && <JacobiIteration />}
        {activeComponent === 'GaussSeidelIteration' && <GaussSeidelIteration />}
        {activeComponent === 'ConjugateGradient' && <ConjugateGradient />}
      </div>
    );
  }
}

export default RootOfEquationSubMenu;
