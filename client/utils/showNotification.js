export default function showNotification(title, body, tag) {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(`seems that you didn't check your Blood sugar for ${title}`, {
          body: body,
          icon: "/icons/icon-192x192.png",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: tag,
        });
      });
    }
  });
}
