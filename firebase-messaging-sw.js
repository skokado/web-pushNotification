importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '553965550320'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

/*
messaging.onMessage(function (payload) {
    var notificationTitle = payload.notification.title;
    var notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    if (!("Notification" in window)) {
    } else if (Notification.permission === "granted") {
        var notification = new Notification(notificationTitle, notificationOptions);
    }
});
*/
