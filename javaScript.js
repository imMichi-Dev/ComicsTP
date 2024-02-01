const $ =  (selector) => document.querySelector(selector);
const $$ =  (selector) => document.querySelectorAll(selector);

// const url = "https://api.example.com/v1/data";

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
const clearTable = (selector) => $(selector).innerHTML = '';

const urlBase = `http://gateway.marvel.com/v1/public/`
const ts = 1
const publicKey = "3dcf1982b6eb3862570fd32b036be586"
const hash= "566d51213e3f642444b9dfdff2db691d"
let page = 1

const getMarvelComics = async () => {
    let url = `${urlBase}comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    const response = await fetch (url)
    const data = await response.json()
    console.log(data.data.results)
    return data.data.results

}


const getMarvelCharacters = async () => {
    const url = `${urlBase}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    const response = await fetch (url)
    const data = await response.json()
    console.log(data.data.results)
    return data.data.results
}


//imprimir personaje
const printCharacter = async() => {
    const characters = await getMarvelCharacters()
    clearTable(".mainTable")
    for(let character of characters){
        $(".mainTable").innerHTML += `
        <div class = "itemBox">
                <div class=" w-48 items-center">
                    <img  src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                    <p class="characterTitle font-semibold">${character.name}</p> 
                </div> 
        </div> 
        `
    }  
}
//imprimir comic
const printComic = async() => {
    const comics = await getMarvelComics()
    clearTable(".mainTable")
    for(let comic of comics){
        $(".mainTable").innerHTML += `
        <div class = "itemBox">
                <div class="w-48 items-center">
                    <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                </div>
                <p class="comicTitle font-semibold">${comic.title}</p>
        </div>     
        `
    }  
}


const printComicDescription = async() => {
    const comics = await getMarvelComics()
    for(let comic of comics){      
        clearTable(".comicDescription")
        const comicDate = comic.dates.find(date => date.type === "onsaleDate").date;
        const formattedDate = new Date(comicDate).toDateString();

        const writers = comic.creators.items.filter(creator => creator.role === "writer");
        const writerNames = writers.map(writer => writer.name).join(', ');

        if (comic.textObjects && comic.textObjects.length > 0) {
            $(".comicDescription").innerHTML += `
            <div>
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
            </div>
            <div>
                <p>${comic.title}</p>
                <p>Publicado:</p>
                <p>${formattedDate}</p>
                <p>Guionistas: </p>
                <spam>${writerNames}</spam>
                <p>Descripción: </p>
                <spam>${comic.textObjects[0].text}<spam>
            </div>
            <div>
                <p>Personajes</p>
                <p># results</p>
                <div>
                    <img src="#" alt="characterCover">
                    <p class="characterTitle font-semibold"></p> 
                </div>
            </div>   
            `
        }
    }  
}


const pageFirst = document.querySelector("page-first");
const pageNext = document.querySelector("page-next");
const pagePrev = document.querySelector("page-prev");
const pageLast = document.querySelector("page-last");




const initializeApp = () => {
    getMarvelComics()
    getMarvelCharacters()
    printComic()

    $(".typeSearch").addEventListener("input", (e) => {
        const selectionType = e.target.value
        if (selectionType==="comics"){
            printComic()
        }else{
            printCharacter()
        }
    })

    // $("#categoria-select").addEventListener("input", (e) => {
    //     const filterSelected = e.target.value
    //     const currentData = getData("operations")
    //     if(filterSelected==="Todas"){
    //         setData("operations", currentData)
    //         renderOperations(currentData)
    //     }else{
    //         const filterOperation = currentData.filter(operation => operation.category === filterSelected)
    //         renderOperations(filterOperation)
    //     }
    // })




}
window.addEventListener("load", initializeApp)