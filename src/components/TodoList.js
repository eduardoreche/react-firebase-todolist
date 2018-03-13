import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'firekit-provider';

import TodoForm from './TodoForm';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all'
    };
  }

  componentWillMount() {
    const { watchList, firebaseApp } = this.props;
    watchList('todos');

    const todoRef = firebaseApp.database().ref('todos');
    watchList(todoRef);

    watchList('todos', 'todos');
  }

  componentWillUnmount() {
    const { unwatchList } = this.props;
    unwatchList('todos');
    unwatchList('my_todos');
  }

  add(values) {
    const { firebaseApp } = this.props;
    const todoRef = firebaseApp.database().ref('todos');
    todoRef.push({ text: values.todo, done: false });
  }

  checkTodo(todo) {
    const { firebaseApp } = this.props;
    const todoRef = firebaseApp.database().ref(`todos/${todo.key}`);
    todoRef.update({ done: !todo.val.done });
  }

  remove(todo) {
    this.props.firebaseApp
      .database()
      .ref(`todos/${todo.key}`)
      .remove();
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  renderTodoListItem(todo) {
    const { todoDone, todoActive, hide } = styles;
    const { text, done } = todo.val;
    const { filter } = this.state;
    const hidden =
      (filter === 'active' && done) || (filter === 'completed' && !done);

    return (
      <div
        className="list-group-item list-group-item-action"
        key={todo.key}
        style={hidden ? hide : {}}
      >
        <div className="row">
          <div className="col-10">
            <a
              onClick={() => this.checkTodo(todo)}
              href="#done"
              style={done ? todoDone : todoActive}
            >
              {text}
            </a>
          </div>
          <div className="col-2 text-right">
            <a
              href="#remove"
              className="btn btn-outline-primary btn-sm"
              onClick={() => this.remove(todo)}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }

  renderFilterButtons() {
    const filterOptions = [
      { name: 'All', value: 'all' },
      { name: 'Active', value: 'active' },
      { name: 'Completed', value: 'completed' }
    ];
    return (
      <div className="mt-1">
        <ul className="nav nav-pills nav-fill">
          {_.map(filterOptions, option => {
            const { filter } = this.state;
            const { name, value } = option;
            return (
              <li key={value} className="nav-item">
                <a
                  className={filter === value ? 'nav-link active' : 'nav-link'}
                  onClick={() => this.setFilter(value)}
                  href="#filter"
                >
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { todos } = this.props;
    return (
      <div className="todoList">
        <h1>Todos</h1>
        <TodoForm onSubmit={this.add.bind(this)} />

        {this.renderFilterButtons()}

        <div className="list-group mt-1">
          {_.map(todos, todo => this.renderTodoListItem(todo))}
        </div>
      </div>
    );
  }
}

const styles = {
  todoActive: {
    color: 'black',
    fontWeight: 'bolder'
  },
  todoDone: {
    textDecoration: 'line-through',
    color: 'lightgrey',
    fontStyle: 'italic'
  },
  hide: {
    display: 'none'
  }
};

const mapStateToProps = ({ lists }) => {
  return { todos: lists.todos };
};

export default connect(mapStateToProps)(withFirebase(TodoList));
