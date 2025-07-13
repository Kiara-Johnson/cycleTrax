// Cache Version
const VERSION = "v1";
// Cache Name
const CACHE_NAME = `cycle-tracker-${VERSION}`;

//Static resources for functionality
const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/app.js",
  "/circleicon-512-512.png",
];

//Saving cache on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })()
  );
});

//Delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.map((name) => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
        return undefined;
      }),
    );
    await clients.claim();
  })(),
  );
});

