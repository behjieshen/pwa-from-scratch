var api = '1b71a88f96a24a28ba81205bdf77a03b';
var main = document.querySelector('main');
var sources = document.querySelector('#sources');
var defaultSource = 'techcrunch';

window.addEventListener('load', async event => {
  updateNews();
  await updateSources();
  sources.value = defaultSource;

  sources.addEventListener('change', event => {
    updateNews(event.target.value);
  });

  if ('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('sw.js');
      console.log('Service worker enabled');
    } catch (err) {
      console.log('Service worker failed');
    }
  }
});

async function updateSources() {
  const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${api}`);
  const json = await res.json();

  sources.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('/n');
}

async function updateNews(source = defaultSource) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`
  );
  const json = await res.json();
  main.innerHTML = json.articles
    .map(
      article => `
        <div class="article">
          <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src=${article.urlToImage}>
            <p>${article.description}</p>
          </a>
        </div>
      `
    )
    .join('\n');
}
