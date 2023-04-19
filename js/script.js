'use strict';
/*const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
};*/

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
  targetArticle.classList.add('active');
  console.log('visible article:', targetArticle);
}

const articleSelector = '.post';
const articleTagsSelector = '.post-tags .list';
const titleSelector = '.post-title';
const titleListSelector = '.titles';
const authorSelector = '.post-author';
const tagsListSelector = '.tags.list';


function generateTitleLinks(customSelector = '') {
console.log('Run generateTitleLinks ' + generateTitleLinks);

/*remove contents of titleList*/
const titleList = document.querySelector(titleListSelector);
titleList.innerHTML = '';

/* all the articles and save them to variable: articles /
/ for each article*/
const articles = document.querySelectorAll(articleSelector + customSelector);
console.log(customSelector);
let html = '';
for (let article of articles) {
/*get the article id*/
const articleId = article.getAttribute('id');
/*find get the title element*/
const articleTitle = article.querySelector(titleSelector).innerHTML;
console.log('Find Title of each articles' + articleTitle);
/*create HTML of the link*/
const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
console.log('Generating linkHTML for each article' + linkHTML);
/*insert link into titleList*/
html = html + linkHTML;
}
titleList.innerHTML = html;
const links = document.querySelectorAll('.titles a');
console.log('links visible' + links);

for (let link of links) {
link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();

function calculateTagsParams(tags){

const params ={ min: 99999, max: 0};

for(let tag in tags){
if(tags[tag] > params.max){
params.max = tags[tag];
}

if(tags[tag] < params.min){
params.min = tags[tag];
}
}
return params;
}

const CloudClassCount = 5;
const CloudClassPrefix = 'tag-size-';

function calculateTagClass(count, params){
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (CloudClassCount - 1) + 1 );

return CloudClassPrefix + classNumber;
}

function generateTags() {
/*[NEW] create a new variable allTags with an empty array*/
let allTags = {};

/*find all articles*/
const articles = document.querySelectorAll(articleSelector);

/*START LOOP: for every article:*/
for (let article of articles) {

/*find tags wrapper*/
const tagWrapper = article.querySelector(articleTagsSelector);

/*make html variable with empty string*/
let html = '';

/*get tags from data-tags attribute*/
const articleTags = article.getAttribute('data-tags');

/*split tags into array*/
const articleTagsArray = articleTags.split(' ');

/*START LOOP: for each tag*/
for (let tag of articleTagsArray) {

/*generate HTML of the link*/
const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

/*add generated code to html variable*/
html += linkHTML;

/*[NEW] check if this link is NOT already in allTags*/
if(!allTags.hasOwnProperty(tag)){
allTags[tag] = 1;
} else {
allTags[tag]++;
}
/*END LOOP: for each tag*/
}
/*insert HTML of all the links into the tags wrapper*/
tagWrapper.innerHTML = html;
}
/*[NEW] find list of tags in right column*/
const tagList = document.querySelector(tagsListSelector);

/*[NEW] add html from allTags to tagList*/
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams);
let allTagsHTML = '';

for(let tag in allTags){
const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
console.log('tagLinkHTML:', tagLinkHTML);
allTagsHTML += tagLinkHTML;
/*tag + ' (' + allTags[tag] + ') ';*/
/*allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>'*/
}

tagList.innerHTML = allTagsHTML;
}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiveLinks) {
    /* remove class active */
    tagActiveLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('.post-tags a'); /* 'a[href^="#tag-"]' */
  /* START LOOP: for each link */
  for (let allTagLink of allTagsLinks) {
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(articleSelector);

  for (let article of articles) {
    /*Read value of element with post-author class*/
    const articleAuthor = article.querySelector(authorSelector);
    /*Make post-author value empty */
    articleAuthor.innerHTML = '';
    let html = '';
    /*get authors from data-author attribute*/
    const author = article.getAttribute('data-author');
    /*split authors into array*/
    const linkHTML = `<a href="#author-${author}">${author}</a> `;
    /*Add value to post-author*/
    html += linkHTML;
    articleAuthor.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  //   /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //   /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  //   /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  //   //   /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  //   //  START LOOP: for each active tag link
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  /* find all links to tags */
  const linksToAuthor = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let linkToAuthor of linksToAuthor) {
    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();