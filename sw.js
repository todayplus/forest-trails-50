// 숲길 50선 서비스 워커 — 앱 파일은 캐시 우선(백그라운드 갱신), 오프라인에서도 열림
const CACHE = 'trail50-v3';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-192.png', './icon-maskable-512.png', './apple-touch-icon.png',
  './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css', './vendor/leaflet/images/marker-icon.png', './vendor/leaflet/images/layers.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  if (!same && !url.hostname.includes('jsdelivr')) return; // 지도 타일·날씨·외부 링크는 네트워크 그대로
  const isNav = req.mode === 'navigate';
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // ?view=map 같은 바로가기 주소도 같은 index.html 캐시로 연다
    const hit = await cache.match(isNav ? './index.html' : req, {ignoreSearch: isNav});
    const net = fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') cache.put(isNav ? './index.html' : req, res.clone());
      return res;
    }).catch(() => hit);
    return hit || net;
  })());
});
