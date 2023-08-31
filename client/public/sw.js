/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return (
      registry[uri] ||
      new Promise((resolve) => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = (depUri) => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require,
    };
    registry[uri] = Promise.all(depsNames.map((depName) => specialDeps[depName] || require(depName))).then((deps) => {
      factory(...deps);
      return exports;
    });
  };
}
define(["./workbox-8f0e986c"], function (workbox) {
  "use strict";

  importScripts("fallback-development.js");
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute(
    "/",
    new workbox.NetworkFirst({
      cacheName: "start-url",
      plugins: [
        {
          cacheWillUpdate: async ({ request, response, event, state }) => {
            if (response && response.type === "opaqueredirect") {
              return new Response(response.body, {
                status: 200,
                statusText: "OK",
                headers: response.headers,
              });
            }
            return response;
          },
        },
        {
          handlerDidError: async ({ request }) => self.fallback(request),
        },
      ],
    }),
    "GET"
  );
  workbox.registerRoute(
    /.*/i,
    new workbox.NetworkOnly({
      cacheName: "dev",
      plugins: [
        {
          handlerDidError: async ({ request }) => self.fallback(request),
        },
      ],
    }),
    "GET"
  );
});
function showNotification(title, body, tag) {
  self.registration.showNotification(`${title}`, {
    body: body,
    icon: "/icons/icon-192x192.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: tag,
  });
}
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
});
let mealsTime = {
  breakfast: { min: 7, max: 10 },
  lunch: { min: 12, max: 15 },
  snack: { min: 16, max: 19 },
  dinner: { min: 20, max: 23 },
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
      return "other";
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
      return cachedResponse.json();
    })
    .catch((err) => console.log(err));
  return logBooksFromCache.then((logs) => {
    let todayTimeInHours = new Date().getHours();
    let mealRequiredComparedToTime = checkMealValidity(todayTimeInHours);

    //meal must push to notifications
    return logs.forEach((element) => {
      let differenceBetweenNowAndMissingMeal = new Date() - mealsTime[mealRequiredComparedToTime].min;
      if (differenceBetweenNowAndMissingMeal > 1000 * 60 * 30 && element.meal !== mealRequiredComparedToTime) {
        showNotification(`you haven't logged your ${mealRequiredComparedToTime} for today`, "Would you like to do it now?", "meal");
      }
    });
  });
}
async function updateBadge() {
  const unreadCount = 1; //fixed value for testing
  navigator.setAppBadge(unreadCount).catch((error) => {
    console.log("Error setting badge.");
  });
}
//# sourceMappingURL=sw.js.map
