import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import firekitReducers from 'firekit';

const rootReducer = combineReducers({
  form: reduxFormReducer.plugin({
    todo: (state, action) => {
      switch (action.type) {
        case '@@redux-form/SET_SUBMIT_SUCCEEDED':
          return undefined;
        default:
          return state;
      }
    }
  }),
  ...firekitReducers
});

export default rootReducer;
