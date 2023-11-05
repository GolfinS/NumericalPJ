// RootOfEquationSubMenu.js
import React, { Component } from 'react';
import GraphicalMethod from './GraphicalMethod';
import Bisection from './Bisection';
import FalsePosition from './FalsePosition';
import OnePointIteration from './OnePointIteration';
import TaylorSeries from './TaylorSeries';
import NewtonRaphson from './NewtonRaphson';
import SecantMethod from './SecantMethod';

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
        <button onClick={() => this.setActiveComponent('GraphicalMethod')}>
          Graphical Method
        </button>
        <button onClick={() => this.setActiveComponent('Bisection')}>
          Bisection
        </button>
        <button onClick={() => this.setActiveComponent('FalsePosition')}>
          False Position
        </button>
        <button onClick={() => this.setActiveComponent('OnePointIteration')}>
          One-Point Iteration
        </button>
        <button onClick={() => this.setActiveComponent('TaylorSeries')}>
          Taylor Series
        </button>
        <button onClick={() => this.setActiveComponent('NewtonRaphson')}>
          Newton Raphson
        </button>
        <button onClick={() => this.setActiveComponent('SecantMethod')}>
          Secant Method
        </button>
        {activeComponent === 'GraphicalMethod' && <GraphicalMethod />}
        {activeComponent === 'Bisection' && <Bisection />}
        {activeComponent === 'FalsePosition' && <FalsePosition />}
        {activeComponent === 'OnePointIteration' && <OnePointIteration />}
        {activeComponent === 'TaylorSeries' && <TaylorSeries />}
        {activeComponent === 'NewtonRaphson' && <NewtonRaphson />}
        {activeComponent === 'SecantMethod' && <SecantMethod />}
      </div>
    );
  }
}

export default RootOfEquationSubMenu;
