function showNotification(title, body, tag) {
  self.registration.showNotification(`${title}`, {
    body: body,
    icon: "/icons/icon-512x512.png",
    vibrate: [200, 100, 400],
    tag: tag,
    badge: "/diabuddies_logo_D_badge.png",
  });
}
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  clients.openWindow("https://diabuddies.app/app/add");
});
// on periodic error
self.addEventListener("periodicsyncerror", (event) => {
  console.log("error", event);
});
// on periodic sync
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "show-notification") {
    event.waitUntil(checkRecentLogsAndDisplayNotification());
  }
});
//pass indexChart data and cache it
self.addEventListener("message", (event) => {
  if (event.data.action === "logBook") {
    // Cache data in the service worker
    const data = event.data.data;
    event.waitUntil(
      caches.open("logs").then((cache) => {
        // Cache a response for a specific URL
        return cache.put("/api/logBook", new Response(JSON.stringify(data)));
      })
    );
  }
  //cache recent food
});
let mealsTime = {
  breakfast: { min: 5, max: 11 },
  lunch: { min: 11, max: 15 },
  snack: { min: 15, max: 19 },
  dinner: { min: 19, max: 23 },
};

//get propre meal for this time
function checkMealValidity(mealHour) {
  switch (true) {
    case mealHour >= mealsTime.breakfast.min && mealHour < mealsTime.breakfast.max:
      return "breakfast";
    case mealHour >= mealsTime.lunch.min && mealHour < mealsTime.lunch.max:
      return "lunch";
    case mealHour >= mealsTime.snack.min && mealHour < mealsTime.snack.max:
      return "snack";
    case mealHour >= mealsTime.dinner.min:
      return "dinner";
    default:
      return "meals";
  }
}
function checkRecentLogsAndDisplayNotification() {
  let logBooksFromCache = caches
    .match("/api/logBook")
    .then((cachedResponse) => {
      // If the resource is found in the cache, return it
      if (cachedResponse) {
        return cachedResponse.json().then((result) => result);
      }
      console.log(cachedResponse);
      return cachedResponse.json().then((result) => result);
    })
    .catch((err) => console.log(err));
  return logBooksFromCache.then((logs) => {
    let todayTimeInHours = new Date().getHours();
    let mealRequiredComparedToTime = checkMealValidity(todayTimeInHours);

    //meal must push to notifications
    if (logs[0]) {
      logs.forEach((element) => {
        let differenceBetweenNowAndMissingMeal = new Date() - mealsTime[mealRequiredComparedToTime]?.min;
        if (differenceBetweenNowAndMissingMeal > 1000 * 60 * 90 && element.meal !== mealRequiredComparedToTime) {
          return showNotification(`you haven't logged your ${mealRequiredComparedToTime} for today`, "Would you like to do it now?", "meal");
        }
      });
    }
    return showNotification(`you haven't logged your ${mealRequiredComparedToTime} for today`, "Would you like to do it now?", "meal");
  });
}
async function updateBadge() {
  const unreadCount = 1; //fixed value for testing
  navigator.setAppBadge(unreadCount).catch((error) => {
    console.log("Error setting badge.");
  });
}
self.addEventListener("install", (event) => {
  console.log("Installed");
});

self.addEventListener("activate", (event) => {
  console.log("Activated");
});
//# sourceMappingURL=sw.js.map
