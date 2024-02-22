const $ =  (selector) => document.querySelector(selector);
const $$ =  (selector) => document.querySelectorAll(selector);

// const url = "https://api.example.com/v1/data";

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
const clearTable = (selector) => $(selector).innerHTML = '';



const urlBase = `https://gateway.marvel.com/v1/public/`
const ts = 1
const publicKey = "3dcf1982b6eb3862570fd32b036be586"
const hash= "566d51213e3f642444b9dfdff2db691d"

let type= "comics"
let orderBy= "title"
let offSet= 0
let search=""


let page = 1
let urlAPI = `https://gateway.marvel.com/v1/public/${type}?limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}`
console.log(urlAPI);


function getMarvelComics() {
    const searchData =search ? `&nameStartsWidth=${search}` : ""
    urlAPI =`https://gateway.marvel.com/v1/public/${type}?limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}${searchData}`

    console.log(urlAPI);
    return fetch(urlAPI)
    .then((response) => response.json())
    .then((data) => console.log(data))
}


$("#orderComic").onchange = function (e) {
    orderBy= e.target.value
    console.log(`order by`,orderBy)
    console.log(urlAPI);

}
$("#typeComic").onchange = function (e) {
    type= e.target.value
    console.log(type)
    console.log(urlAPI);
}
$("#searchImput").onchange = function (e) {
    search = e.target.value
    console.log("holi2")
}
$("#search-button").onclick = function (e) {
    getMarvelComics()
}


const pageFirst = document.querySelector("page-first");
const pageNext = document.querySelector("page-next");
const pagePrev = document.querySelector("page-prev");
const pageLast = document.querySelector("page-last");


window.addEventListener("load", () => {
    getMarvelComics()
})