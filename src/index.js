import React from 'react';
import reactDOM from 'react-dom';
import App from './routers/App';
import firebase from 'firebase/app';
import 'firebase/analytics';
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

reactDOM.render(<App/>, container);


