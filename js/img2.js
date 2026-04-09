document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "QWU22fmB7FE5iToyRrUWz9wBxdTBDFNeHwLTqxBkIvY"; // Replace with your actual API key
     const url = "https://api.unsplash.com/search/photos";
    // const url = 'https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}';

    let page = 1;
    let query = "";

    const searchButton = document.getElementById("search-button");
    const showMoreButton = document.getElementById("show-more-button");
    const searchInput = document.getElementById("search-input");
    const imageContainer = document.getElementById("image-container");

    searchButton.addEventListener("click", () => {
        query = searchInput.value.trim();
        if (!query) return;
        page = 1; // Reset page number when a new search is performed
        fetchImages(query);
    });

    showMoreButton.addEventListener("click", () => {
        page++;
        fetchImages(query, page);
    });

    async function fetchImages(query, page = 1) {
        try {
            const response = await fetch(`${url}?query=${query}&page=${page}&client_id=${API_KEY}`);
            const data = await response.json();
            if (page === 1) {
                displayImages(data.results);
            } else {
                appendImages(data.results);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    function displayImages(images) {
        imageContainer.innerHTML = "";
        images.forEach(image => {
            const imageCard = createImageCard(image);
            imageContainer.appendChild(imageCard);
        });
    }

    function appendImages(images) {
        images.forEach(image => {
            const imageCard = createImageCard(image);
            imageContainer.appendChild(imageCard);
        });
    }

    function createImageCard(image) {
        const card = document.createElement("div");
        card.classList.add("image-card");

        const img = document.createElement("img");
        img.classList.add("image");
        img.src = image.urls.regular;

        const title = document.createElement("h2");
        title.classList.add("image-title");
        title.textContent = image.alt_description || "Untitled";

        const link = document.createElement("a");
        link.href = image.links.html;
        link.textContent = "View on Unsplash";
        link.target = "_blank";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(link);

        return card;
    }
});
