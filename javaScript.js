// //BASIC FUNCTIONS AND VARIABLES
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const clearTable = (selector) => ($(selector).innerHTML = "");

const urlBase = `https://rickandmortyapi.com/api/`;

let type = "character";
let search = "";
let page = 1;
let urlAPI = `https://rickandmortyapi.com/api/${type}?`;
let totals = 0;
let datos = [];

//FETCHING
async function getRAMContent() {
  try {
    //  $("#loader").style.display = "block"
    urlAPI = `https://rickandmortyapi.com/api/${type}?page=${page}`;
    const response = await fetch(urlAPI);
    const data = await response.json();
    console.log(data);
    datos = data.results;
    totals = data.info.count;
    console.log(totals);
    $(".resultCount").textContent = `${totals} Resultados`;
  } catch (error) {
    console.log(error);
    //         $("#loader").style.display = "none"
    //         $("#loader").innerText = "Error al cargar datos."
  }
  console.log("holi");
  renderCharacters();
  updatePageNumbers();
}

// //FILTERS
//     function orderByChange () {
//         if (type=="characters" && $("#orderComic").value=="title"){
//             orderBy= "name"
//             return
//         }else if(type=="characters"&&  $("#orderComic").value=="-title") {
//             orderBy= "-name"
//             return
//         }else{
//             orderBy= $("#orderComic").value
//         }
//     }

//     function TypeChange () {
//         if (type=="characters" && orderBy=="title"){
//             orderBy= "name"
//             console.log("characters1")
//             return
//         }else if(type=="characters" && orderBy=="-title") {
//             orderBy= "-name"
//             console.log("characters2")
//             return
//         }else{
//             orderBy=$("#orderComic").value
//         }
//     }

$("#searchButton").onclick = function (e) {
  e.preventDefault();
  console.log(search.value);
  search = $("#inputSearch").value;
  type = $("#typeFilter").value;

  getRAMContent();
  console.log(urlAPI);
};

// //PAGES BUTTONS
$("#page-prev").onclick = function (e) {
  if (page > 1) {
    page--;
    getRAMContent();
  }
};
$("#page-next").onclick = function (e) {
  page++;
  getRAMContent();
};
function updatePageNumbers() {
  $(".pageNumbers").textContent = `Pág. ${page} de ${Math.ceil(totals / 20)}`;
}

// //GETTING ID'S
async function getCharacterId(id) {
  let data;
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  console.log(data);

  printcharacterDescription(data);
  console.log("got it");

  //     getCharacterEpisodes(id)
}

//     async function getCharacterEpisodes(id) {
//         try {
//             const response = await fetch(`https://rickandmortyapi.com/api/character/${id}/episodes`)
//             const data = await response.json()
//             const characters = data.results
//             printCharacterEspisodes(characters)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async function getEpisodeId(id){
//         try {
//             const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
//             const data = await response.json()
//             datos = data.results
//         } catch (error) {
//             console.log(error);
//         }
//         printEpisodeDescription(datos)
//         getEpisodeCharacters(id)
//     }

//     async function getCharacterComics(id) {
//         try {
//             const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}/characters`)
//             const data = await response.json()
//             const comics = data.results
//             printEpisodeCharacters(comics)
//         } catch (error) {
//             console.error(error)
//         }
//     }

// //RENDERS

// CHARACTERS AND EPISODES RENDER
function renderCharacters() {
  console.log("holi 2");
  clearTable(".contentCards");
  datos.forEach((dato) => {
    if (type == "character") {
      $(".contentCards").innerHTML += `

          <div
            class="group bg-card-bg border border-gray-800 rounded overflow-hidden hover:border-gray-500 transition-all cursor-pointer"
          onclick="getCharacterId(${dato.id})">
            <div class="relative aspect-[3/4] overflow-hidden"> 
              <img
                src="${dato.image}"
                alt="${dato.name}"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div class="p-3">
              <h3 class="font-inter font-bold text-sm truncate">
                ${dato.name}
              </h3>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-gray-400">${dato.status}</span>
              </div>
            </div>
          </div>
`;

      updatePageNumbers();

      //                         <div class="itemBox w-30 sm:w-40  sm:px-2 lg:m-5 my-3" onclick="getCharacterId(${comic.id})">
      //                                 <div class=" items-center lg:m-8 my-5">
      //                                     <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.name}">
      //                                 </div>
      //                                 <p class="comicTitle font-semibold">${comic.name}</p>
      //                         </div>
      //                         `
    } else {
      console.log("holi episode");

      $(".contentCards").innerHTML += `
                <div class="group bg-card-bg border border-gray-800 rounded overflow-hidden hover:border-gray-500 transition-all cursor-pointer shadow-lg">
                    <div class="relative aspect-[3/4] bg-[#111] flex flex-col items-center justify-center group-hover:bg-[#1a1a1a] transition-colors">
                        <span class="font-antonio text-5xl font-bold text-gray-700 group-hover:text-white transition-colors">${dato.episode}</span>
                    </div>
                    <div class="p-3">
                        <h3 class="font-inter font-bold text-sm truncate text-gray-200">${dato.name}</h3>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-xs text-gray-500">${dato.air_date}</span>
                            <span class="text-xs text-gray-600">📺</span>
                        </div>
                    </div>
                  </div>
`;
      updatePageNumbers();

      //                         <div class = "itemBox w-30 sm:w-40  sm:px-2 lg:m-5 my-3" onclick="getComicId(${comic.id})">
      //                                 <div class=" items-center">
      //                                     <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
      //                                 </div>
      //                                 <p class="comicTitle font-semibold">${comic.title}</p>
      //                         </div>
      //                         `
    }
  });
}

// CHARACTER DESCRIPTION RENDERS

function printcharacterDescription(data) {
  clearTable(".contentCards");
  $(".contentCards").classList.add("hidden");
  $(".resultCount").classList.add("hidden");
  $(".paginationButtons").classList.add("hidden");
  $(".characterDescriptionPanel").classList.remove("hidden");
  $(".characterDescriptionPanel").innerHTML += `
<div class="bg-app-bg text-white font-inter flex items-center justify-center p-2 md:p-4">

    <div class="bg-panel-bg w-full max-w-5xl rounded-lg shadow-2xl border border-gray-800 overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        
        <div class="w-full md:w-5/12 relative group h-96 md:h-auto overflow-hidden">
            <img src="${data.image}" 
                 alt="${data.name}" 
                 class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
            
            <a href="index.html" class="absolute top-6 left-6 z-20 flex items-center gap-2 bg-card-bg/80 hover:bg-white hover:text-black text-white px-4 py-2 rounded transition-all text-xs font-bold tracking-widest uppercase border border-gray-700">
                <span>&larr;</span> Volver
            </a>
        </div>

        <div class="w-full md:w-7/12 p-8 md:p-10 flex flex-col relative">
            
            <div class="mb-8 border-b border-gray-700 pb-6">
                <div class="flex items-center gap-3 mb-2">

                    <span class="text-green-400 font-bold uppercase tracking-widest text-xs">${data.status}</span>
                    <span class="text-gray-600">|</span>
                    <span class="text-text-muted uppercase tracking-widest text-xs">${data.species} &bull; ${data.gender}</span>
                </div>

                <h1 class="font-antonio text-6xl md:text-7xl font-bold text-white mb-2 leading-none">
                    ${data.name}
                </h1>
                
                <span class="font-mono text-xs text-text-muted bg-card-bg px-2 py-1 rounded border border-gray-800">ID: #00${data.id}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                
                <div>
                    <h3 class="text-[10px] uppercase text-text-muted tracking-widest mb-1 font-bold">Origen</h3>
                    <div class="flex items-center gap-2 text-gray-200">
                        <span class="text-lg font-medium">${data.origin.name}</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-[10px] uppercase text-text-muted tracking-widest mb-1 font-bold">Ubicación Actual</h3>
                    <div class="flex items-center gap-2 text-gray-200">
                        <span>📍</span>
                        <span class="text-lg font-medium">${data.location.name}</span>
                    </div>
                </div>

                <div class="col-span-1 sm:col-span-2 bg-card-bg p-4 rounded border border-gray-800 mt-2">
                    <h3 class="text-[10px] uppercase text-gray-500 tracking-widest mb-2 font-bold">Registro en Base de Datos</h3>
                    <div class="flex items-center gap-3 font-mono text-sm text-gray-300">
                        <span>📅</span>
                        ${new Date(data.created).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-antonio text-2xl text-white">Episodios</h3>
                    <span class="text-[10px] font-bold text-gray-500 bg-card-bg px-2 py-1 rounded border border-gray-800">${data.episode.length} CAPS</span>
                </div>

                <div class="bg-card-bg border border-gray-800 rounded-lg p-4">
                    
                    <div class=" charactersEpisodesList flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-panel-bg 
                        [&::-webkit-scrollbar-thumb]:bg-gray-700 
                        [&::-webkit-scrollbar-thumb]:rounded-full">
                        
                        <a href="#" class="bg-panel-bg border border-gray-700 text-gray-400 px-3 py-1 text-xs rounded hover:bg-white hover:text-black hover:border-white transition-all font-medium">S01E01</a>
                        <a href="#" class="bg-panel-bg border border-gray-700 text-gray-400 px-3 py-1 text-xs rounded hover:bg-white hover:text-black hover:border-white transition-all font-medium">S01E02</a>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>`;

  //             <div class="flex flex-col">
  //                 <div class="flex flex-row justify-start w-full ">
  //                     <div class="min-w-48 max-w-80">
  //                         <img src="${dato.thumbnail.path}.${dato.thumbnail.extension}" alt="${dato.title}">
  //                     </div>
  //                     <div class="text-left ml-6">
  //                         <p class="font-bold">${dato.title}</p>
  //                         <p class="font-bold">Publicado:</p>
  //                         <p>${formattedDate}</p>
  //                         <p class="font-bold">Guionistas: </p>
  //                         <spam>${writerNames}</spam>
  //                         <p class="font-bold">Descripción: </p>
  //                         <spam>${dato.description}<spam>
  //                     </div>
  //                 </div>
  //                 <div class="text-left">
  //                     <p class="font-bold">Personajes</p>
  //                     <p class="resultCharactersCount"></p>
  //                 </div>
  //             </div>
  //             `
}
//}

// CHARACTER EPISODES RENDER

function printCharacterEspisodes(characters) {
  if (dato.episode.length === 0) {
    $(
      ".characterEpisodesPanel"
    ).innerHTML += `<p class="font-bold">No results</p>`;
  } else {
    console.log("holi episodesss!!!");

    for (const character of characters) {
      $(".characterEpisodesPanel").innerHTML += `
                    <a
                  href="#"
                  class="px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded text-xs text-gray-400 hover:bg-white hover:text-black hover:border-white transition"
                  >${dato.episode[0]}</a
                >`;
    }
  }
}

//     function printCharacterDescription (datos)  {
//         clearTable(".mainTable")
//         for(const dato of datos){
//             $(".mainTable").innerHTML += `
//             <div class="flex flex-col w-full">
//                 <div class="flex flex-row justify-start w-full">
//                     <div class="min-w-48 max-w-80">
//                         <img src="${dato.thumbnail.path}.${dato.thumbnail.extension}" alt="${dato.name}">
//                     </div>
//                     <div class="text-left ml-6">
//                         <p class="font-bold">${dato.name}</p>
//                         <spam>${dato.description}<spam>
//                     </div>
//                 </div>
//                 <div class="text-left">
//                     <p class="font-bold">Comics</p>
//                     <p class="resultComicsCount"></p>
//                 </div>
//             </div>
//             `
//         }
//     }

//     function printCharacterComics (comics){
//         $(".resultComicsCount").textContent = `${comics.length} Resultados`
//         if(comics.length===0){
//             $(".mainTable").innerHTML += `<p class="font-bold">No results</p>`
//         }else{
//             for (const comic of comics) {
//                 $(".mainTable").innerHTML += `
//                 <div class = "itemBox  min-w-40 max-w-48 m-5" onclick="getComicId(${comic.id})">
//                         <div class="w-48 items-center">
//                             <img  src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
//                         </div>
//                         <p class="comicTitle font-semibold">${comic.title}</p>
//                 </div>
//                 `
//         }
//     }

//     }

const initializeApp = () => {
  getRAMContent();
  console.log(urlAPI);
};
window.addEventListener("load", initializeApp);
