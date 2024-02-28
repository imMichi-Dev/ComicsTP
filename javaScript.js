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
        urlAPI =`https://gateway.marvel.com/v1/public/${type}?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}${searchData}`
        console.log("cambios aqui", urlAPI)
        const response = await fetch(urlAPI)
        const data = await response.json()
        datos = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
        
    } catch (error) {
        console.log(error);
    }
    renderComics()
    //printComicDescription()
}

function renderComics() {
    clearTable(".mainTable")
    $(".resultCount").textContent = `${datos.length} Resultados`
    datos.forEach((comic) => {
        if(type=="characters"){
            console.log("holi")
            $(".mainTable").innerHTML += `

                <div class="itemBox" >
                        <div class="w-48 items-center">
                            <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.name}">
                        </div>
                        <p class="comicTitle font-semibold">${comic.name}</p>
                </div>  
  
                    `
        }else{
            console.log("holi")
            $(".mainTable").innerHTML += `
  
                <div class = "itemBox" onclick="getComicId(${comic.id})">
                        <div class="w-48 items-center">
                            <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                        </div>
                        <p class="comicTitle font-semibold">${comic.title}</p>
                </div>     

                    `
        }
    })
}

$("#orderComic").onchange = function (e) {
    if (type=="characters" && e.target.value=="title"){
        orderBy= "name"
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

const pageFirst = document.querySelector("page-first");

const pageLast = document.querySelector("page-last");

$(".page-prev").onclick = function (e) {
    offSet -= 20
    getMarvelComics()
}
$(".page-next").onclick = function (e) {
    offSet += 20
    getMarvelComics()
}



// $(".cardButton").onclick = function (e) {
//     printComicDescription()
// }
async function getComicId(id){

    try {

        const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        const data = await response.json()
        datos = data.data.results

        
    } catch (error) {
        console.log(error);
    }
    printComicDescription(datos)
}


function printComicDescription (datos)  {
            clearTable(".mainTable")
            for(const dato of datos){
            const comicDate = dato.dates.find(date => date.type === "onsaleDate").date;
            const formattedDate = new Date(comicDate).toDateString();
    
            const writers = dato.creators.items.filter(creator => creator.role === "writer");
            const writerNames = writers.map(writer => writer.name).join(', ');
    
            if (dato.textObjects && dato.textObjects.length > 0) {
                $(".mainTable").innerHTML += `
                <div>
                    <img src="${dato.thumbnail.path}.${dato.thumbnail.extension}" alt="${dato.title}">
                </div>
                <div>
                    <p>${dato.title}</p>
                    <p>Publicado:</p>
                    <p>${formattedDate}</p>
                    <p>Guionistas: </p>
                    <spam>${writerNames}</spam>
                    <p>Descripción: </p>
                    <spam>${dato.textObjects[0].text}<spam>
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
            }}
        }
    







// const printComicDescription = async() => {
//     const comics = await getMarvelComics()
//     console.log("holi description");
//     for(let comic of comics){
//         console.log("holi description2");
//         clearTable(".comicDescription")
//         const comicDate = comic.dates.find(date => date.type === "onsaleDate").date;
//         const formattedDate = new Date(comicDate).toDateString();

//         const writers = comic.creators.items.filter(creator => creator.role === "writer");
//         const writerNames = writers.map(writer => writer.name).join(', ');

//         if (comic.textObjects && comic.textObjects.length > 0) {
//             $(".comicDescription").innerHTML += `
//             <div>
//                 <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
//             </div>
//             <div>
//                 <p>${comic.title}</p>
//                 <p>Publicado:</p>
//                 <p>${formattedDate}</p>
//                 <p>Guionistas: </p>
//                 <spam>${writerNames}</spam>
//                 <p>Descripción: </p>
//                 <spam>${comic.textObjects[0].text}<spam>
//             </div>
//             <div>
//                 <p>Personajes</p>
//                 <p># results</p>
//                 <div>
//                     <img src="#" alt="characterCover">
//                     <p class="characterTitle font-semibold"></p>
//                 </div>
//             </div>
//             `
//         }
//     }
// }


const initializeApp = () => {
    getMarvelComics()
    

}

window.addEventListener("load", initializeApp)