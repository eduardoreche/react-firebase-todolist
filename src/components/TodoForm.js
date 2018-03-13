import React from 'react';
import { Field, reduxForm } from 'redux-form';

const TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <div className="todoForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field
            name="todo"
            component="input"
            type="text"
            placeholder="What needs to be done?"
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'todo'
})(TodoForm);
