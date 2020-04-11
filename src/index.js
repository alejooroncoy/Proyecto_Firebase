import React from 'react';
import reactDOM from 'react-dom';
import {createStore, compose } from 'redux';
import {Provider} from 'react-redux';
import App from './routers/App';
import reducer from './reducers';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/firestore';
const container = document.getElementById("container");
firebase.initializeApp({
    apiKey: "AIzaSyBFWI1EkToFw4vcCectreIppHAISigJE0Y",
    authDomain: "cervewilmer.firebaseapp.com",
    databaseURL: "https://cervewilmer.firebaseio.com",
    projectId: "cervewilmer",
    storageBucket: "cervewilmer.appspot.com",
    messagingSenderId: "123220680272",
    appId: "1:123220680272:web:79efbe8a04a69d81957b55",
    measurementId: "G-V0SE9SJWKF"
  });
firebase.analytics();
firebase.messaging().usePublicVapidKey('BHOE2H_uqbnLne3dAnXwbCz_-EmfoJh-zmQjV1WH21RFyPaxc5efwnLjkRGZK8A3WbfdOR2lHNr81n9gM5t0Yok');
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
navigator.serviceWorker.register('/service-worker.js')
.then(registration => {
  firebase.messaging().useServiceWorker(registration)
  console.log("listo");
}).catch(registrationError => {
  console.log(registrationError);
});
});
};
firebase.messaging().onMessage(payload => {
  M.toast({
    html: `Ya tenemos un nuevo producto!, es el producto ${payload.data.titulo}`,
    classes: 'rounded text-primary bg-secondary',
    displayLength: 2000
});
});
const initialState = {
    "results": [],
    "enviar": false
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,composeEnhancers());
reactDOM.render(
  <Provider store={store}>
        <App/>
    </Provider>
  , container);