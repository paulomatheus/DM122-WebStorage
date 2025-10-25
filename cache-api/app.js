const button = document.querySelector("button");

button.addEventListener("click", async () => {
  console.log(`👁️ [app.js] button clicked`);
//fetchFromNetwork("https://api.github.com/users/{user}
//fetchFromNetwork("https://nonexist/api/v2/pokemon/150");
//fetchFromNetwork("https://httpbin.org/status/500");
  const randomId = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const data = await fetchData(url);
  showData(data);
});

async function fetchData(url) {
  console.log(`👁️ [app.js] fetching data...`);
  return (await fetchFromCache(url)) || (await fetchFromNetwork(url));
}

async function fetchFromNetwork(url) {
  console.log(`👁️ [app.js] fetching data from network...`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Error on requesting ${url} with status code ${response.status}`
      );
      return;
    }
    addToCache(url, response.clone());
    // console.log(
    //   `👁️ [app.js] response content-type`,
    //   response.headers.get("content-type")
    // );
    return response.json();
  } catch (error) {
    console.error(`👁️ [app.js] network failed`);
  }
}

async function fetchFromCache(url) {
  console.log(`👁️ [app.js] attempt to fetch data from cache...`);
  const response = await caches.match(url);
  if (!response) {
    console.log(`👁️ [app.js] no cache data for ${url}`);
    return;
  }
  return response.json();
}

async function addToCache(key, response) {
  const cache = await caches.open("MY-CACHE-KEY");
  cache.put(key, response);
}

function showData(data) {
  console.log(`👁️ [app.js] show data`, data);
  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  document.body.appendChild(img);
}