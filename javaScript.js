//BASIC FUNCTIONS AND VARIABLES
    const $ =  (selector) => document.querySelector(selector);
    const $$ =  (selector) => document.querySelectorAll(selector);

    const clearTable = (selector) => $(selector).innerHTML = ''

    const urlBase = `https://gateway.marvel.com/v1/public/`
    const ts = 1
    const publicKey = "3dcf1982b6eb3862570fd32b036be586"
    const hash= "566d51213e3f642444b9dfdff2db691d"

    let type= "comics"
    let orderBy= "title"
    let offSet= 0
    let search=""
    let resultsPerPage = 20 
    let page = 1
    let urlAPI = `https://gateway.marvel.com/v1/public/${type}?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}`
    let totals = 0
    let datos = []

//FETCHING
async function getMarvelComics() {
    try {
        const searchValue = `${type == "characters" ? `name` :`title` }StartsWith=`
        console.log(searchValue.value, "searchValue.value")
        const searchData = search ? `&${searchValue}${search}` : ""
        urlAPI =`https://gateway.marvel.com/v1/public/${type}?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offSet}&orderBy=${orderBy}${searchData}`
        const response = await fetch(urlAPI)
        const data = await response.json()
        datos = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
        totals = data.data.total
        $(".resultCount").textContent = `${totals} Resultados`
    } catch (error) {
        console.log(error);
    }
    renderComics()
}


//FILTERS
    function orderByChange () {
        if (type=="characters" && $("#orderComic").value=="title"){
            orderBy= "name"
            return
        }else if(type=="characters"&&  $("#orderComic").value=="-title") {
            orderBy= "-name"
            return
        }else{
            orderBy= $("#orderComic").value
        }
    }

    function TypeChange () {
        if (type=="characters" && orderBy=="title"){
            orderBy= "name"
            console.log("characters1")
            return
        }else if(type=="characters" && orderBy=="-title") {
            orderBy= "-name"
            console.log("characters2")
            return
        }else{
            orderBy=$("#orderComic").value
        }
    }
 
    $("#search-button").onclick = function (e) {
        console.log(search.value)
        console.log(orderBy.value)

        search= $("#searchImput").value 
        type= $("#typeComic").value
        TypeChange ()
        orderByChange()
        
        getMarvelComics()
        console.log(urlAPI)
    }
//PAGES BUTTONS

    $(".page-prev").onclick = function (e) {
        if (page > 1) {
            page--
            offSet -= resultsPerPage
            getMarvelComics()
        }
    };
    $(".page-next").onclick = function (e) {
        page++
        offSet += resultsPerPage
        getMarvelComics()
    };

    $(".page-first").onclick = function (e) {
        page = 1
        offSet = 0
        getMarvelComics()
    };

    $(".page-last").onclick = function (e) {
        const totalPages = Math.ceil(totals / resultsPerPage)
        page = totalPages
        offSet = (totalPages - 1) * resultsPerPage
        getMarvelComics()
        
    };

//GETTING ID'S
    async function getComicId(id){
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            const data = await response.json()
            datos = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
        } catch (error) {
            console.log(error);
        }
        printComicDescription(datos);
        getComicCharacters(id)
    }
    async function getComicCharacters(id) {
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            const data = await response.json()
            const characters = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
            printComicCharacters(characters)
        } catch (error) {
            console.error(error)
        }
    }
    async function getCharacterId(id){
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            const data = await response.json()
            datos = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available")) 
        } catch (error) {
            console.log(error);
        }
        printCharacterDescription(datos)
        getCharacterComics(id)
    }
    async function getCharacterComics(id) {
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            const data = await response.json()
            const comics = data.data.results.filter(comic=>!comic.thumbnail.path.includes("image_not_available"))
            printCharacterComics(comics)
        } catch (error) {
            console.error(error)
        }
    }
//RENDERS
    function renderComics() {
        clearTable(".mainTable")
        datos.forEach((comic) => {
            if(type=="characters"){
                $(".mainTable").innerHTML += `
                        <div class="itemBox lg:min-w-40 lg:max-w-48 lg:m-5" onclick="getCharacterId(${comic.id})">
                                <div class="w-48 lg:items-center lg:m-8 my-5">
                                    <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.name}">
                                </div>
                                <p class="comicTitle font-semibold">${comic.name}</p>
                        </div> 
                        `
            }else{
                $(".mainTable").innerHTML += `
                        <div class = "itemBox w-700 lg:min-w-40 lg:max-w-48 lg:m-8 my-5" onclick="getComicId(${comic.id})">
                                <div class="lg:w-48 lg:items-center">
                                    <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                                </div>
                                <p class="comicTitle font-semibold">${comic.title}</p>
                        </div>     
                        `
            }
        })
    }

    function printComicDescription (datos)  {
        clearTable(".mainTable")
        for(const dato of datos){
        const comicDate = dato.dates.find(date => date.type === "onsaleDate").date;
        const formattedDate = new Date(comicDate).toDateString();
    
        const writers = dato.creators.items.filter(creator => creator.role === "writer");
        const writerNames = writers.map(writer => writer.name).join(', ');
    
        $(".mainTable").innerHTML += `
        <div class="flex flex-col">
            <div class="flex flex-row justify-start w-full ">
                <div class="min-w-48 max-w-80">
                    <img src="${dato.thumbnail.path}.${dato.thumbnail.extension}" alt="${dato.title}">
                </div>
                <div class="text-left ml-6">
                    <p class="font-bold">${dato.title}</p>
                    <p class="font-bold">Publicado:</p>
                    <p>${formattedDate}</p>
                    <p class="font-bold">Guionistas: </p>
                    <spam>${writerNames}</spam>
                    <p class="font-bold">Descripción: </p>
                    <spam>${dato.description}<spam>
                </div>
            </div>
            <div class="text-left">
                <p class="font-bold">Personajes</p>
                <p class="resultCharactersCount"></p>
            </div>
        </div>
        `
    }}

    function printComicCharacters (characters){
        $(".resultCharactersCount").textContent = `${characters.length} Resultados`
        if(characters.length===0){
            $(".mainTable").innerHTML += `<p class="font-bold">No results</p>`
        }else{
            for (const character of characters) {
                    $(".mainTable").innerHTML += `
                    <div>
                        <div class="w-48 justify-items-start items-center m-8" onclick="getCharacterId(${character.id})">
                            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                        </div>
                        <p class="comicTitle font-semibold">${character.name}</p>
                    </div>`   
            }
        }
        
    }

    function printCharacterComics (comics){
        $(".resultComicsCount").textContent = `${comics.length} Resultados`
        if(comics.length===0){
            $(".mainTable").innerHTML += `<p class="font-bold">No results</p>`
        }else{
            for (const comic of comics) {
                $(".mainTable").innerHTML += `
                <div class = "itemBox  min-w-40 max-w-48 m-5" onclick="getComicId(${comic.id})">
                        <div class="w-48 items-center">
                            <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                        </div>
                        <p class="comicTitle font-semibold">${comic.title}</p>
                </div>     
                `
        }}
        
    }
        
    function printCharacterDescription (datos)  {
        clearTable(".mainTable")
        for(const dato of datos){
            $(".mainTable").innerHTML += `
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-start w-full">
                    <div class="min-w-48 max-w-80">
                        <img src="${dato.thumbnail.path}.${dato.thumbnail.extension}" alt="${dato.name}">
                    </div>
                    <div class="text-left ml-6">
                        <p class="font-bold">${dato.name}</p>
                        <spam>${dato.description}<spam>
                    </div>
                </div>
                <div class="text-left">
                    <p class="font-bold">Comics</p>
                    <p class="resultComicsCount"></p>
                </div>
            </div>
            `
        }
    }

const initializeApp = () => {
    getMarvelComics()
    console.log(urlAPI)
}
window.addEventListener("load", initializeApp)