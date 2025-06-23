const apiKey = "kg_5oKyIvcAYU2_yU5opkxaqOwq_3WBV3VSN5CKYzDY";

const Form = document.getElementById("form");
const Search = document.getElementById("search");
const Result = document.getElementById("result");
const MoreBtn = document.getElementById("more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = Search.value.trim();
    if (!keyword) return;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=20`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Only clear previous results if it's the first page
        if (page === 1) {
            Result.innerHTML = "";
        }

        if (!data.results || data.results.length === 0) {
            MoreBtn.style.display = "none";
            if (page === 1) {
                Result.innerHTML = "<p style='color: white; text-align:center;'>No results found.</p>";
            }
            return;
        }

        data.results.forEach((result) => {
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Unsplash image";

            imageLink.appendChild(image);
            Result.appendChild(imageLink);
        });

        // Only show More button if more pages are available
        if (data.total_pages && page < data.total_pages) {
            MoreBtn.style.display = "block";
        } else {
            MoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching images:", error);
        Result.innerHTML = "<p style='color: red; text-align:center;'>Failed to fetch images. Try again later.</p>";
        MoreBtn.style.display = "none";
    }
}

Form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

MoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
