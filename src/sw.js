importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
import firebase from 'firebase/app';
import 'firebase/messaging';
import icon from '../public/icon.png';
// self.addEventListener("online", () => {
//     registerRoute(
//         /\.(?:png|jpg|jpeg|svg)$/,
//         new StaleWhileRevalidate({
//             options: {
    
//                 cacheName: 'imagesV',
      
//                 expiration: {
//                   maxEntries: 10,
//                 },
//               },
//         })
//     )
// })
workbox.precaching.precacheAndRoute;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;
workbox.googleAnalytics.initialize({
            parameterOverrides: {
                cd1: 'offline'
            }
        });
workbox.core.skipWaiting();
workbox.core.clientsClaim();
registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new StaleWhileRevalidate({
        options: {

            cacheName: 'imagesV',
  
            expiration: {
              maxEntries: 10,
            },
          },
    })
)
// registerRoute(
//     /^https:\/\/firebasestorage.(?:googleapis|gstatic).com\/(.*)/,
//     new StaleWhileRevalidate({
//         options: {
//             cacheName: 'imagesHome'
//         }
//     })
// )
registerRoute(
    /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-cache',
    expiration:{
                maxAgeSeconds: 30 * 24 * 60 * 60
    }
    }),
)
// registerRoute(
//     /^http?.*/,
//     new workbox.strategies.NetworkFirst(),
// )
firebase.initializeApp({
    apiKey: "AIzaSyBFWI1EkToFw4vcCectreIppHAISigJE0Y",
    projectId: "cervewilmer",
    messagingSenderId: "123220680272",
    appId: "1:123220680272:web:79efbe8a04a69d81957b55",
  });
firebase.messaging().setBackgroundMessageHandler(payload => {
    const titutloNotificación = "Ya tenemos un nuevo producto";
    const opcionesNotifcation = {
        body: payload.data.titulo,
        icon: icon,
        click_action: "https://blogeekplatzi-initial.web.app/"
    }
    return self.registration.showNotification(titutloNotificación,
        opcionesNotifcation);
})
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);