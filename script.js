const API_KEY = "ebf4960f19e946719e8c5348d47e4842";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("world"));
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
 searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
 })
 // Function to handle search
function handleSearch() {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}

// Event listener for Enter key press
searchText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Enter key code is 13
        event.preventDefault();
        handleSearch();
    }
});

// Event listener for search button click
searchButton.addEventListener("click", handleSearch);


const toggleMenu = () => {
    document.body.classList.toggle("open");
  }
  
  const closeMenu = () => {
    if (document.body.classList.contains("open")) {
      toggleMenu();
    }
  }
  
  // Close menu when clicking on a navigation item
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", closeMenu);
  });
  
  // Close menu when scrolling
  window.addEventListener("scroll", closeMenu);



  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    const isDarkMode = body.classList.contains("dark-mode");
    updateColors(isDarkMode);
}

function updateColors(isDarkMode) {
    const root = document.documentElement;

    if (isDarkMode) {
        root.style.setProperty("--primary-text-color", "#ffffff");
        root.style.setProperty("--secondary-text-color", "#a8b8c8");
        root.style.setProperty("--accent-color", "#79b1f9");
        root.style.setProperty("--accent-color-dark", "#5688c7");
        root.style.setProperty(" --background-color: #ffffff;");
    } else {
        root.style.setProperty("--primary-text-color", "#183b56");
        root.style.setProperty("--secondary-text-color", "#577592");
        root.style.setProperty("--accent-color", "#2294ed");
        root.style.setProperty("--accent-color-dark", "#1d69a3");
        root.style.setProperty("--background-color: #000000;");
    }
}
updateColors(false);
