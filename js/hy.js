const accesskey = "QWU22fmB7FE5iToyRrUWz9wBxdTBDFNeHwLTqxBkIvY";
const searchform = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const searchResult = document.getElementById("search-result");
const ShowMorebtn = document.getElementById("Show-More-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
     if(page===1){
        searchResult.innerHTML ="";
     }
    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";

        imagelink.appendChild(image);
        searchResult.appendChild(imagelink);
    });
    ShowMorebtn.style.display = "block";

    page++; // Increment page for next search
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous results
    searchImages();
});


ShowMorebtn.addEventListener("click",()=>{
    page++;
    searchImages();
})