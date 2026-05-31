/* ═══════════════════════════════════════════════════════════════
   LOBOL service worker
   - Makes the app work offline (caches the app shell).
   - Updates "live over wifi": when you push new files to GitHub,
     the app fetches the fresh versions next time it has internet.
   - NEVER touches your saved data. All your records live in
     localStorage, which the service worker does not cache or clear,
     so updates can never wipe your stuff.
═══════════════════════════════════════════════════════════════ */

// Bump this string whenever you want to force a full refresh of cached files.
const CACHE = 'lobol-cache-v1';

// The app shell (everything needed to run offline). Paths are relative
// so it works under a GitHub Pages project URL (user.github.io/repo/).
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './base.css', './extra.css', './style.css', './weather.css',
  './inligting.css', './trucks.css', './mobile.css',
  './data.js', './nav.js', './weather.js', './dashboard.js',
  './products.js', './trucks.js', './stock.js', './duties.js',
  './reminders.js', './customers.js', './sales.js', './deliveries.js',
  './notes.js', './workers.js', './calc.js', './guides.js',
  './export.js', './health.js', './inligting.js', './kaart.js',
  './flashcards.js',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// Install: pre-cache the shell, then activate immediately.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .catch(() => {}) // a single failed asset shouldn't block install
      .then(() => self.skipWaiting())
  );
});

// Activate: drop old caches, take control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Let cross-origin requests (weather API, map tiles, fonts) go
  // straight to the network so they're always live.
  if (url.origin !== self.location.origin) return;

  // HTML / navigations: network-first so you get the latest UI when
  // online, but still load from cache when offline.
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // CSS / JS / icons: stale-while-revalidate — instant from cache,
  // refreshed from the network in the background so the next launch
  // already has your newest changes.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Allow the page to tell a waiting worker to take over right away.
self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
