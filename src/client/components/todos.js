import PropTypes from 'prop-types';
import React from 'react';

import { api, deleteApiPromise  } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  updateTodos: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos, deleteTodo }) =>  {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';
console.log(todos);
  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  // const deleteTodo = json => {
  //   // console.log(json);
  //   const index = todos.findIndex(todo => {
  //
  //     return todo.id === json.id;
  //   });
  //
  //   updateTodos(
  //     [
  //       ...todos.slice(0, index),
  //       ...todos.slice(index + 1),
  //     ]
  //   );
  // }

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const putTodo = json => {

    const index = todos.findIndex(todo => {

      return todo.id === json.id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        json,
        ...todos.slice(index + 1),
      ]
    );
  }
  const putArchive = json => {
    console.log(json);
    updateTodos(
      [
        ...todos.slice(0, index),
        json,
        ...todos.slice(index + 1),
      ]
    );
  }
  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {


  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    console.log(todo);
    const filter= todos.filter(t=> t.id === todo)
    if (filter[0].status === 'active'){
       filter[0].status = 'complete'
    }

    console.log(filter);
    // const newTodo = Object.assign({}, todo);
    // newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
    // newTodo.archive = false;
    // console.log(todos.filter(t=> t.id === todo));
    api('PUT', filter, putTodo);
    ;
  }
  const onClickArchive = todo => {
    const updateStatus= todo.status = 'archive'
    // console.log(todo);
    api('PUT', todo, putArchive)
  }
  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
   // console.log(todos);
  const renderTodos = () => {
    if (!Array.isArray(todos)) {
      return null;
    }
    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case 'active':
          filtered = todo.status === 'complete';
          break;
        case 'completed':
          filtered = todo.status !== 'complete';
          break;
        case 'archived':
          filtered = todo.status === 'archive'
        default:
          filtered = false;
      }
      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickTodo={onClickTodo}
          onClickArchive={onClickArchive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
          id={todo.id}
          deleteTodo={deleteTodo}

        />
      );
    })
  }

  return (
    <ul className={baseCls}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
