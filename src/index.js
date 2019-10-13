import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

import axios from 'axios';
axios.get('https://unieloo-sandbox.herokuapp.com/teste')
.then(function (res) {
    const profissionais = res.data.data;
    ReactDOM.render(<App profissionais={profissionais}/>, document.getElementById('root'));
})
.catch(function (error) {
  console.log(error);
});

serviceWorker.unregister();
