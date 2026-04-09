const accesskey = "QWU22fmB7FE5iToyRrUWz9wBxdTBDFNeHwLTqxBkIvY";
const searchform = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const categorySelect = document.getElementById('category-select');
const searchResult = document.getElementById("search-result");
const ShowMorebtn = document.getElementById("Show-More-btn");
const searchStatus = document.getElementById("search-status");
const quickTags = document.querySelectorAll('.search-tags a');
const heroSections = document.querySelectorAll('.hide-on-search');

let keyword = "";
let page = 1;

async function searchImages() {
    const category = categorySelect.value;
    keyword = (category ? category + ' ' : '') + searchBox.value.trim();
    if (!keyword.trim()) {
        searchStatus.textContent = 'Please enter a search term or select a category.';
        return;
    }

    if (page === 1) {
        searchResult.innerHTML = "";
        heroSections.forEach((section) => {
            section.style.display = 'none';
        });
        searchStatus.textContent = `Showing results for "${keyword}"`;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(keyword)}&client_id=${accesskey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results || [];

    if (results.length === 0 && page === 1) {
        searchResult.innerHTML = '<p class="no-results">No results found. Try a different keyword.</p>';
        ShowMorebtn.style.display = 'none';
        return;
    }

    results.forEach((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-box");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image preview";

        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        const imageName = document.createElement("p");
        imageName.textContent = result.alt_description ? result.alt_description.charAt(0).toUpperCase() + result.alt_description.slice(1) : "Untitled image";

        const imageInfo = document.createElement("p");
        imageInfo.textContent = `By: ${result.user.name}`;

        imageContainer.appendChild(imagelink);
        imageContainer.appendChild(imageName);
        imageContainer.appendChild(imageInfo);
        searchResult.appendChild(imageContainer);
    });

    ShowMorebtn.style.display = 'block';
    page += 1;
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = "";
    searchImages();
});

ShowMorebtn.addEventListener("click", () => {
    searchImages();
});

categorySelect.addEventListener('change', function() {
    page = 1;
    searchResult.innerHTML = "";
    searchImages();
});

quickTags.forEach((tag) => {
    tag.addEventListener('click', function(event) {
        event.preventDefault();
        searchBox.value = this.dataset.query;
        page = 1;
        searchResult.innerHTML = "";
        searchImages();
    });
});