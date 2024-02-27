const $ =  (selector) => document.querySelector(selector);
const $$ =  (selector) => document.querySelectorAll(selector);

// const url = "https://api.example.com/v1/data";

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
const clearTable = (selector) => $(selector).innerHTML = ''



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

let datos = []

async function getMarvelComics() {
    try {
        
        const searchData = search ? `&${type = "characters" ? `name` : `title`}StartsWith=${search}` : ""
        
        urlAPI =`https://gateway.marvel.com/v1/public/${type}?limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}${searchData}`
        console.log("cambios aqui", urlAPI)
        const response = await fetch(urlAPI)
        const data = await response.json()
        datos = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
        
    } catch (error) {
        console.log(error);
    }
    
    // return data.data.results   ("image_not_available"))
    // renderComics()
    renderCharacters()
}
function renderComics() {
    clearTable(".mainTable")
    datos.forEach((comic) => {
        console.log("holi")
        $(".mainTable").innerHTML += `
        <div class = "itemBox">
                <div class="w-48 items-center">
                    <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                </div>
                <p class="comicTitle font-semibold">${comic.title}</p>
        </div>     
                `
        })
    }

  

function renderCharacters() {
    clearTable(".mainTable")
    datos.forEach((character) => {
        
        $(".mainTable").innerHTML += `
        <div class = "itemBox">
                <div class=" w-48 items-center">
                    <img  src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                    <p class="characterTitle font-semibold">${character.name}</p> 
                </div> 
        </div> 
        `
        })
    }

$("#orderComic").onchange = function (e) {
    if (type=="characters" && e.target.value=="title"){
        orderBy= "-name"
        return
    }else if(type=="characters"&&  e.target.value=="-title") {
        orderBy= "-name"
        return
    }else{
        orderBy= e.target.value
    }
    console.log(`order by`,orderBy)
}
$("#typeComic").onchange = function (e) {
    type= e.target.value
    if (type=="characters" && orderBy=="title"){
        orderBy= "name"
        return
    }else if(type=="characters" && orderBy=="-title") {
        orderBy= "-name"
        return
    }else{
        orderBy="title"
    }
    console.log(`order by`,orderBy)


}
$("#searchImput").onchange = function (e) {
    search = e.target.value
}
$("#search-button").onclick = function (e) {
    getMarvelComics()
}


//imprimir personaje


// const printCharacter = async() => {
//     const characters = await getMarvelComics()
//     clearTable(".mainTable")
//     for(let character of characters){
//         
//     }  
// }
// imprimir comic
// const printComic = async() => {
//     const comics = await getMarvelComics()
//     clearTable(".mainTable")
//     for(let comic of comics){

// }






const pageFirst = document.querySelector("page-first");
const pageNext = document.querySelector("page-next");
const pagePrev = document.querySelector("page-prev");
const pageLast = document.querySelector("page-last");


window.addEventListener("load", () => {
    getMarvelComics()
})