const navbar_container = document.createElement("div");
navbar_container.setAttribute("class", "nav");

const logoNameContainer = document.createElement("div");
logoNameContainer.setAttribute("class", "logo");

logoNameContainer.innerHTML = `
<span id="logoName1">Explore<span id="logoName2">ANIME             <img src="Majdi-Khawaja-Smurfs-Clumsy.ico"></span></span>`



navbar_container.appendChild(logoNameContainer);


const linksContainer = document.createElement("div");
linksContainer.setAttribute("class", "links");

function createAnchorTags() {
    let arr = ["About", "Contact Us"]
    for (let i = 0; i < arr.length; i++) {
        let aTag = document.createElement("a");
        aTag.innerText = arr[i];
        aTag.setAttribute("href", "https://www.google.com/")
        linksContainer.appendChild(aTag);
    }

}
createAnchorTags();

navbar_container.appendChild(linksContainer);


document.body.append(navbar_container);

const middle_container = document.createElement("div");
middle_container.setAttribute("class", "middle_container")

const searchContainer = document.createElement("div");
searchContainer.setAttribute("class", "searchContainer");

searchContainer.innerHTML = `
<p class="intro">Dive Into The World Of</p>
<p class="intro">Anime</p>
<input type="text" id="searchText" placeholder="Search for an anime, e.g Naruto">
<button id="submit_btn">Search</button>
<button id="next_button">Next</button>`

document.body.append(searchContainer);

document.querySelector("#submit_btn").setAttribute("onclick", "getAnimeResult()");


const nextButton = document.querySelector("#next_button")
nextButton.setAttribute("onclick", "nextSetOfResults()")

let searchResultCount = 0;

async function getAnimeResult() {
    let searchText = document.getElementById("searchText").value;
    nextButton.style.display = "block";
    try{
        const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`)
        const data = await response.json();
        const searchResult = data["results"];
        let i = 0;
        for (i; i < searchResult.length; i++) {
            createElements(searchResult[i]);
            if (i == 9) {
                break;
            }
        }
    }
    catch(err){
        alert(err);
    }
   
}

async function nextSetOfResults() {


    let searchText = document.getElementById("searchText").value;
    
    try{
    const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`)
    const data = await response.json();
    const searchResult = data["results"];
    let diff = searchResult.length - searchResultCount;
    destroyElements();  
    if (diff > searchResultCount) {
        console.log("going inside if condition and count is:" + searchResultCount)
        let count = 0;

        for (let i = searchResultCount; i < diff; i++) {
            count++
            createElements(searchResult[i]);
            console.log(searchResult[i])
            if (count == 10) {
                break;
            }
        }
    }
    nextButton.style.display = "block";
    }
    catch(err){
        alert(err);
    }
    
}

var invokeFunction = true;
function createElements({ image_url, title, synopsis, type, episodes, score, start_date, end_date }) {
    searchResultCount++;

    let searchText = document.getElementById("searchText").value;
    if (title.toLowerCase().includes(searchText)) {
        const displayContainer = document.createElement("div");
        displayContainer.setAttribute("class", "displayContainer");
        displayContainer.innerHTML = `

<img src=${image_url}>
<div class="para-container">
<p><span class = "side-headings">Title: </span>${title}</p>
<p><span class = "side-headings">Synopsis: </span>
<br>${synopsis}</p>
<div class="anime-info">
<p><span class = "side-headings">Type: </span>${type}</p>
<p><span class = "side-headings">Episodes: </span>${episodes}</p>
<p><span class = "side-headings">IMDB rating: </span>${score}</p>
<p><span class = "side-headings">Start Date: </span>${new Date(start_date).toDateString()}</p>
<p><span class = "side-headings">End Date: </span>${new Date(end_date).toDateString()}</p>
</div>
</div>`

        document.body.append(displayContainer);
    }
    else {

        result();
        invokeFunction =false;
    }

}

document.onkeydown = function clearSearchResult(event) {

    if (event.keyCode == 8) {
        destroyElements();
    }
}

function destroyElements() {

    let searchText = document.getElementById("searchText").value

    if (searchText.length === 0) {
        let destroyElements = document.querySelectorAll(".displayContainer");
        destroyElements.forEach((element) => {
            document.body.removeChild(element)

        })

    }
    else {
        let destroyElements = document.querySelectorAll(".displayContainer");
        destroyElements.forEach((element) => {
            document.body.removeChild(element)
        })
    }
    nextButton.style.display = "none";
}

function result() {


    if (invokeFunction) {
        const displayContainer = document.createElement("div");
        displayContainer.setAttribute("class", "displayContainer");
        displayContainer.innerHTML = `
        <p>No Results To Display</p>`
        document.body.append(displayContainer);
        nextButton.style.display = "none";
    } 


}



