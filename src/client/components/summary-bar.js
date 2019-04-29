import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import React from 'react';
//
const noop = () => {};
// //
// // @private
// //
// // @returns {ReactElement}


class SummaryBar extends Component {

  completeAll =()=> {
    console.log('hi');
  }

  render() {
    // console.log(this.props.todos.length);
    return (
      <div className='summaryBar'>
        <h1>Summary Bar</h1>
        <h3> {this.props.todos.length} tasks remaining </h3>
        <h4 onClick={this.completeAll}> Complete All </h4>
      </div>
    );
  }

}

export default SummaryBar;
