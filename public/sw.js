const CACHE_NAME = "fitness-app-v2";
const urlsToCache = [
  // "/fit-track/",
  // "/fit-track/index.html",
  // "/fit-track/manifest.json",
  // "/fit-track/favicon.ico",
  // "/fit-track/apple-touch-icon.png",
  // "/fit-track/icons/icon-192x192.png",
  // "/fit-track/icons/icon-512x512.png",
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
