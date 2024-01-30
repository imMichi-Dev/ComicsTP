const $ =  (selector) => document.querySelector(selector);
const $$ =  (selector) => document.querySelectorAll(selector);

// const url = "https://api.example.com/v1/data";


// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

const urlBase = `http://gateway.marvel.com/v1/public/`
const ts = 1
const publicKey = "3dcf1982b6eb3862570fd32b036be586"
const hash= "566d51213e3f642444b9dfdff2db691d"

const getMarvelComics = async () => {
    const url = `${urlBase}comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    const response = await fetch (url)
    const data = await response.json()
    console.log(data.data.results)
    return data.data.results

}
getMarvelComics()

const getMarvelCharacters = async () => {
    const url = `${urlBase}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    const response = await fetch (url)
    const data = await response.json()
    console.log(data.data.results)
    return data.data.results


}
getMarvelCharacters()




//filtros




//imprimir personaje
const printCharacter = async() => {
    const characters = await getMarvelCharacters()
    
    for(let character of characters){
        $(".characterCover").innerHTML += `
        <div>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <p class="characterTitle font-semibold">${character.name}</p> 
        </div> 
        `
    }  
}
printCharacter()


//imprimir comic
const printComic = async() => {
    const comics = await getMarvelComics()
    
    for(let comic of comics){
        $(".comicCover").innerHTML += `
        <div>
            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
        </div>
        <p class="comicTitle font-semibold">${comic.title}</p>     
        `
    }  
}
printComic()