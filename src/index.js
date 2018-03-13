import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FirebaseProvider from 'firekit-provider';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';

import App from './components/App';
import reducers from './reducers';

const firebaseConf = {
  apiKey: '<your_api>',
  authDomain: '<your_domain>.firebaseapp.com',
  databaseURL: 'https://<your_domain>.firebaseio.com',
  projectId: '<your_project_id>',
  storageBucket: '<your_domain>.appspot.com',
  messagingSenderId: '<your_msg_id>'
};

const firebaseApp = firebase.initializeApp(firebaseConf);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <FirebaseProvider firebaseApp={firebaseApp}>
      <App />
    </FirebaseProvider>
  </Provider>,
  document.querySelector('#root')
);
