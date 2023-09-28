export function initSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
    return navigator.serviceWorker.ready.then(async (registration) => {
      if ("periodicSync" in registration) {
        const status = await navigator.permissions.query({
          name: "periodic-background-sync",
        });
        return Notification.requestPermission().then((res) => {
          if (res === "granted" && status.state === "granted") {
            return registration.periodicSync.register("show-notification", {
              minInterval: 1000 * 60 * 60 * 3,
            });
          }
        });
      }
    });
  }
}
