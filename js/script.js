'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log(`Link was clicked!`);
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);


    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('was clicked:', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add("active");
    console.log('visible article:', targetArticle);
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

const ArticleSelector = ('.post'),
    TitleSelector = ('.post-title'),
    TitleListSelector = ('.titles');

function generateTitleLinks() {
    console.log('Run generateTitleLinks ' + generateTitleLinks);

    /* remove contents of titleList */
    const titleList = document.querySelector(TitleListSelector);
    titleList.innerHTML = '';

    /* find all the articles and save them to variable: articles */
    /* for each article */
    let articles = document.querySelectorAll(ArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find get the title element */
        const articleTitle = article.querySelector(TitleSelector).innerHTML;
        console.log('Find Title of each articles' + articleTitle);
        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('Generating linkHTML for each article' + linkHTML);
        /* insert link into titleList */
        html = html + linkHTML;
        
        console.log(html)
    }
    titleList.innerHTML = html;
}

generateTitleLinks();