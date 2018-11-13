importScripts('./node_modulesworkbox-sw/buildworkbox-sw.js');

const staticAssets = ['./', './styles.css', './app.js', './fallback.json'];

const wb = new WorkBoxSW();

wb.precache(staticAssets);

wb.router.registerRoute(
  'https://newsapi.org/(.*',
  wb.strategies.netWorkFirst()
);
wb.router.registerRoute(
  /.*\.(png|jpg|jpeg|gif)/,
  wb.strategies.cacheFirst({
    cacheName: 'news-images',
    cacheExpiration: { maxEntries: 20, maxAgeSeconds: 12 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] }
  })
);
