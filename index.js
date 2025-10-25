// variables
const worldnewsBtn = document.getElementById("worldnews");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your NewsAPI key

const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const WORLD_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=world&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

// button listeners
worldnewsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>World News</h4>";
    fetchWorldNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
});

// Fetch functions
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchWorldNews = async () => {
    const response = await fetch(WORLD_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

const fetchQueryNews = async () => {
    if (newsQuery.value == null || newsQuery.value.trim() === "") return;

    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Display function
function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {
        var date = news.publishedAt ? news.publishedAt.split("T") : ["N/A"];
        
        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage || "https://via.placeholder.com/400x200?text=No+Image";

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title || "No title available";

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className = "text-muted";
        discription.innerHTML = news.description || "No description available.";

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url || "#";
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
