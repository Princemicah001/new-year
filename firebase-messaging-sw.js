importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyA0Rivy2cHVeo5NP1IN6zrRpm9DcSuyvKI",
    authDomain: "studio-6640856046-63e7e.firebaseapp.com",
    projectId: "studio-6640856046-63e7e",
    storageBucket: "studio-6640856046-63e7e.firebasestorage.app",
    messagingSenderId: "237310665506",
    appId: "1:237310665506:web:b45a372183c3ea9f1bfb7b"
  };

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    "HAPPY NEW YEAR REMINDER🎆",
    {
      body: payload.data.body,
      icon: "icons/icon-192.png",
      tag: "ny-countdown",
      renotify: true
    }
  );
});
