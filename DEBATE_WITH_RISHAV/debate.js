const heroSection = document.getElementById('heroSection');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');
const copy = document.querySelector(".topper-debaters").cloneNode(true);    /* This is topper section, cloneNode-append child krne ke liye */
const API_KEY = "c52d9d65029049abaa654c0df3f6a7fc";    /* this is live news section */
const url = "https://newsapi.org/v2/everything?q=";

overlayBtn.addEventListener('click', () => {
    heroSection.classList.toggle('right-panel-active');

    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame( () => {
        overlayBtn.classList.add ('btnScaled')
    })
});
document.querySelector(".debaters").appendChild(copy);



/* ====================news section======================================== */
window.addEventListener("load", ()=> fetchNews("India"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    /* console.log(data); */
    bindData(data.articles);       /* bahot se article ko na le sake liye kuch hi article lene ke liye binddata kiya gya hai */
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";
    
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); /* iska mtlb hai ki hum sare div ko lena chahte hai */
        fillDataInCard(cardClone, article);             /* iska hum ek function seprate bnayage tati sari image , title aur bhi details la sake */
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
    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} ⋅ ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");

    });
}
let curSelectedNav = null;/* isse humne jo news select kiya uske purane news ko remove krne ke liye */
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active')      /* iska mtlb hai ki humne jb naye nav ko click kiya to purane wale nav ko remove krna hai. */
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');    /* css me  */
}