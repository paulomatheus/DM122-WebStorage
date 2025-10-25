const button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log(`👁️ [app.js] button clicked`);
    //fetchFromNetwork("https://api.github.com/users/paulomatheus");
    // fetchFromNetwork("https://nonexist/api/v2/pokemon/150");
    //fetchFromNetwork("https://httpbin.org/status/500");
    fetchFromNetwork("https://pokeapi.co/api/v2/pokemon/150").then((data) =>
        showData(data)
    );
});

async function fetchFromNetwork(url) {
    console.log(`👁️ [app.js] fetching data...`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(
                `Error on requesting ${url} with status code ${response.status}`
            );
            return response.json();
        }   
    } catch (error) {
        console.error(`👁️ [app.js] network failed`);
        }
        console.log(
            `👁️ [app.js] response content-type`,
            response.headers.get("content-type")
        );
        return;
    }
 
function showData(data) {
        console.log(`👁️ [app.js] show data`, data);
        const img = document.createElement("img");
        img.src = data.sprites.front_default;
        document.body.appendChild(img);
    }