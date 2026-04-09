const accesskey = "QWU22fmB7FE5iToyRrUWz9wBxdTBDFNeHwLTqxBkIvY";
const searchform = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const searchResult = document.getElementById("search-result");
const ShowMorebtn = document.getElementById("Show-More-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.map((result) => {
        const imageContainer = document.createElement("div");

        // Image
        const image = document.createElement("img");
        image.src = result.urls.small;

        // Image link
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        // Image name
        const imageName = document.createElement("p");
        imageName.textContent = result.alt_description || "Untitled";

        // Image information
        const imageInfo = document.createElement("p");
        imageInfo.textContent = `By: ${result.user.name}`;

        // Append elements to the container
        imageContainer.appendChild(imagelink);
        imageContainer.appendChild(imageName);
        imageContainer.appendChild(imageInfo);

        // Append container to the search result
        searchResult.appendChild(imageContainer);
    });
}

async function showMoreImages() {
    page++;
    await searchImages();
}

searchform.addEventListener("submit", async (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous search results
    await searchImages();
});

ShowMorebtn.addEventListener("click", async () => {
    await showMoreImages();
});
