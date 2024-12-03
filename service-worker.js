const cacheName = "employee-manager-v2";
const assets = ["/", "/index.html", "/app.js", "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"];

// Evento de instalación
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Evento de fetch
self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
