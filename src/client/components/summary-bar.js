import React, { Component } from 'react';
import Todos from './todos';
// import PropTypes from 'prop-types';
// import React from 'react';
//
const noop = () => {};
// //
// // @private
// //
// // @returns {ReactElement}

class SummaryBar extends Component {
  state= {
    completeAll: false
  }

  completeAll =()=> {
    const status= this.props.todos.map(todo => todo.status= 'complete')
    this.setState({completeAll: true})
  }

  render() {
    // console.log(this.props.todos.length);
    return (
      <div className='summaryBar'>
        <h1>Summary Bar</h1>
        <h3> {this.props.todos.length} tasks remaining </h3>
        <h4 onClick={this.completeAll}> Complete All </h4>
        <Todos
          filterBy={this.props.filterBy}
          todos={this.props.todos}
          updateTodos={this.props.updateTodos}
          
        />
      </div>
    );
  }

}

export default SummaryBar;
