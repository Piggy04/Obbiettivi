const CACHE='app-static-v1';
const ASSETS=['/','/index.html','/manifest.json','/icons/icon-192.png','/icons/icon-512.png','/complete.mp3'];

self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request))); });

self.addEventListener('push', e=>{
  const data = e.data ? e.data.json() : { title:'Promemoria', body:'Hai un obiettivo da completare oggi!' };
  e.waitUntil(self.registration.showNotification(data.title || 'Promemoria', {
    body: data.body || 'Hai un obiettivo da completare oggi!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [50,20,50],
    data: data.data || {},
    actions: [{ action:'open', title:'Apri' }]
  }));
});
self.addEventListener('notificationclick', e=>{ e.notification.close(); e.waitUntil(clients.openWindow('/')); });
