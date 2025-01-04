const CACHE_NAME = "fitness-app-v2";
const urlsToCache = [
  // "/forge-fit/",
  // "/forge-fit/index.html",
  // "/forge-fit/manifest.json",
  // "/forge-fit/favicon.ico",
  // "/forge-fit/apple-touch-icon.png",
  // "/forge-fit/icons/icon-192x192.png",
  // "/forge-fit/icons/icon-512x512.png",
  // Add other static assets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/forge-fit/icons/icon-192x192.png",
      badge: "/forge-fit/icons/icon-192x192.png",
      data: data.data,
      requireInteraction: true,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});
