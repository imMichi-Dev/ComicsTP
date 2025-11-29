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
  $(".pageNumbers").textContent = `Pág. ${page} de ${Math.ceil(
    totals / 20
  )}`;
}


// //GETTING ID'S
//     async function getCharacterId(id){
//         try {
//             const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
//             const data = await response.json()
//             datos = data.results
//         } catch (error) {
//             console.log(error);
//         }
//         printcharacterDescription(datos);
//         getComicCharacters(id)
//     }







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
          >
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

function printcharacterDescription(datos) {
  clearTable(".contentCards");
  for (const dato of datos) {
    //             const comicDate = dato.dates.find(date => date.type === "onsaleDate").date;
    //             const formattedDate = new Date(comicDate).toDateString();

    //             const writers = dato.creators.items.filter(creator => creator.role === "writer");
    //             const writerNames = writers.map(writer => writer.name).join(', ');
    $(".contentCards").innerHTML += `
                          <div class="characterDescriptionPanel">
          <div class="w-full md:w-2/5 h-[50vh] md:h-auto relative group">
            <img
              src="${dato.image}"
              alt="${dato.name}"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#292828] via-transparent to-transparent md:hidden"
            ></div>
          </div>

          <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col relative">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-text-muted text-xs uppercase tracking-widest"
                  >${dato.status}</span
                >
                <span class="text-gray-600">|</span>
                <span class="text-text-muted text-xs uppercase tracking-widest"
                  >${dato.species} &bull; ${dato.gender}</span
                >
              </div>

              <h1
                class="font-antonio text-5xl md:text-7xl font-bold leading-none mb-4 text-white"
              >
                ${dato.name}
              </h1>

            </div>

            <div
              class="grid grid-cols-2 gap-6 mb-10 border-t border-gray-700 pt-6"
            >
              <div>
                <span
                  class="text-gray-500 text-[10px] uppercase tracking-widest block mb-1"
                  >Origen</span
                >
                <p
                  class="text-lg font-medium hover:text-gray-300 transition cursor-help"
                >
                  ${dato.origin.name}
                </p>
              </div>

              <div>
                <span
                  class="text-gray-500 text-[10px] uppercase tracking-widest block mb-1"
                  >Ubicación Actual</span
                >
                <p
                  class="text-lg font-medium hover:text-gray-300 transition cursor-help"
                >
                  ${dato.location.name}
                </p>
              </div>

              <div class="col-span-2">
                <span
                  class="text-gray-500 text-[10px] uppercase tracking-widest block mb-1"
                  >Ficha Creada El</span
                >
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">📅</span>
                  <p class="text-sm text-gray-300 font-mono">
                    ${new Date(dato.created).toDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-auto">
              <div class="flex justify-between items-end mb-4">
                <h3 class="font-antonio text-2xl text-white">Apariciones</h3>
                <span
                  class="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded"
                  >${dato.episode.length} Episodios</span
                >
              </div>

              <div
                class="characterEpisodesPanel flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
              >
                <a
                  href="#"
                  class="px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded text-xs text-gray-400 hover:bg-white hover:text-black hover:border-white transition"
                  >${dato.episode[0]}</a
                >

                <span class="px-2 py-1 text-xs text-gray-600 italic"
                  >...y 41 más</span
                >
              </div>
            </div>
          </div>
        </div>



          `;

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
}

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
