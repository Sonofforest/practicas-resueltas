/*Estos arreglos engloban pokemon especificos, como legendarios y ultraentes en base a su ID, se pueden crear mas
para diferentes usos, como mas filtros, decoraciones en bordes de tarjetas y fondos de estadisticas.*/
const legendaryPokemonIds = [144, 145, 146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,
                            383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,
                            494,638,639,640,641,642,643,644,645,646,647,648,649,716,717,718,719,720,
                            721,785,786,787,788,789,790,791,792,800,801,802,807,808,809,888,889,
                            890,891,892,893,894,895,896,897,898,905,1001,1002,1003,1004,1007,1008,1009,
                            1010,1014,1015,1016,1017];
                            
const megas=[10033,10034,10035,10036,10037,10038,10039,10040,10041,10042,10043,10044,10045,10046,10047,10048
            ,10049,10050,10051,10052,10053,10054,10055,10056,10057,10058,10059,10060,10087,10088,10089];
              for (let i = 10062; i <= 10079; i++) { megas.push(i);}
const additionalPokemonIds = [];for (let i = 10229; i <= 10244; i++) { additionalPokemonIds.push(i);}
const ultraentes=[793,794,795,796,797,798,799,803,804,805,806]; 
const Pasado=[899,900,901,902,10236,903,904,];
const commonpokemonids1 =[147,148,149];for (let i = 0; i <= 143; i++) { commonpokemonids1.push(i);}
const commonpokemonids2 =[246,247,248];for (let i = 152; i <= 242; i++) { commonpokemonids2.push(i);}
const commonpokemonids3 =[];for (let i = 252; i <= 376; i++) { commonpokemonids3.push(i);}
const commonpokemonids4 =[];for (let i = 387; i <= 479; i++) { commonpokemonids4.push(i);}
const commonpokemonids5 =[];for (let i = 495; i <= 637; i++) { commonpokemonids5.push(i);}
const commonpokemonids6 =[];for (let i = 650; i <= 715; i++) { commonpokemonids6.push(i);}
const commonpokemonids7 =[];for (let i = 722; i <= 784; i++) { commonpokemonids7.push(i);}
const commonpokemonids8 =[];for (let i = 810; i <= 887; i++) { commonpokemonids8.push(i);}
const commonpokemonids9 =[1005,1006,1011,1012,1013];for (let i = 906; i <= 1000; i++) { commonpokemonids8.push(i);}
/* traduccion de estadisticas */
const statNamesespañol = {
    "hp":"Salud",
    "attack":"Ataque",
    "defense":"Defensa",
    "special-attack":"Ataque especial",
    "special-defense":"Defensa Especial",
    "speed":"Velocidad"
}
const pokemonCache = {};
const pokedex = document.querySelector('.pokedex');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const kantoRegionId = 1; 
let offset = 0;
/*esto establece el limite de los pokemon que se muestran, en este caso de 1ra a 9na generacion
(exceptuando megas, formas regionales)*/
const limit = 1017; 
let loading = false;
let pokemonDataList = []; // Almacena todos los datos de los Pokémon
var lastScrollY = 0;
var ticking = false;
window.addEventListener('scroll', function(e) {
	lastScrollY = window.scrollY;
	if ( ! ticking ) {
		window.requestAnimationFrame(function() {
			console.log( lastScrollY );
			if ( lastScrollY > 0 ) {
				document.body.classList.add('stuck');
			} else {
				document.body.classList.remove('stuck');
			}
			ticking = false;
		});
		ticking = true;
	}
} );


//Funcion para llamar a los pokemon
function fetchKantoPokemon() {
  if (loading) {
    return;
  }

  loading = true;

  // Combina las IDs de los demás Pokémon (excluyendo megas)
  const otherPokemonIds = Array.from({ length: limit }, (_, i) => i + 1)
    .filter(id => !megas.includes(id));

  // Combina las IDs de megas con las IDs de los demás Pokémon
  const allPokemonIds = [...otherPokemonIds, ...megas, ...additionalPokemonIds];

  const promises = allPokemonIds.map(pokemonId => {
    return fetch(`${apiUrl}/${pokemonId}`)
      .then(response => response.json());
  });

  Promise.all(promises)
    .then(results => {
      pokemonDataList = results;
      pokedex.innerHTML = '';

      // Primero, crea tarjetas para los demás Pokémon
      otherPokemonIds.forEach(pokemonId => {
        const pokemonData = pokemonDataList.find(pokemon => pokemon.id === pokemonId);
        createPokemonCard(pokemonData);
      });

      // Luego, crea tarjetas para las megas y los Pokémon adicionales
      allPokemonIds.forEach(pokemonId => {
        const pokemonData = pokemonDataList.find(pokemon => pokemon.id === pokemonId);
        createPokemonCard(pokemonData);
      });

      loading = false;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      loading = false;
    });
}


// Función para crear la tarjeta del Pokémon
function createPokemonCard(pokemon) {
 // Verificar si el Pokémon está en alguno de los arrays específicos
 

    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = `${pokemon.name} image`;
    image.classList.add("iconos");

    card.appendChild(image);
    

    if (legendaryPokemonIds.includes(pokemon.id)) {
        card.style.border="3px solid";
        card.style.borderImage = `linear-gradient(to bottom right, white, gold, gold, white) 2`;
        card.style.borderImageSlice = '3'; 
             
    }
    if (ultraentes.includes(pokemon.id)) {
        card.style.border="3px solid";  
        card.style.borderImage = 'linear-gradient(to bottom right, white, blue,rgb(247, 122, 143), white,blue,rgb(247, 122, 143),white,rgb(247, 122, 143),blue,white,rgb(247, 122, 143),blue,white,rgb(247, 122, 143),blue,white) 2';
        
    }
    if (Pasado.includes(pokemon.id)) {
      card.style.border="3px solid";
      card.style.borderImage = `linear-gradient(to bottom right, black, darkblue, darkblue, black) 2`;
      card.style.borderImageSlice = '3'; 
           
  }
  if (megas.includes(pokemon.id)) {
    card.style.border="3px solid";
    card.style.borderImage = `linear-gradient(to bottom right, red, orange, lightyellow, yellow,lightgreen,skyblue,blue,pink,violet) 2`;
    card.style.borderImageSlice = '3'; 
         
}
    if (commonpokemonids1.includes(pokemon.id)||commonpokemonids2.includes(pokemon.id)
        ||commonpokemonids3.includes(pokemon.id)||commonpokemonids4.includes(pokemon.id)
        ||commonpokemonids5.includes(pokemon.id)||commonpokemonids6.includes(pokemon.id)
        ||commonpokemonids7.includes(pokemon.id)||commonpokemonids8.includes(pokemon.id)
        ||commonpokemonids9.includes(pokemon.id)) {
        card.style.border = '3px solid #b4b7bd';
    }

    pokedex.appendChild(card);

    image.addEventListener('click', () => {
        displayPokemonInfo(pokemon);
    });

    image.addEventListener('dblclick', () => {
      addToTeam(pokemon);
  });
}
/* funcion de habilidades, acá se hace el llamado a cada habilidad que pueda tener el pokemon, y su descripcion esta hecha
en base a la pokedex */
async function habilidades(pokemon, pokemonInfo) {
  const abilityPromises = pokemon.abilities.map(async (ability) => {
      try {
          const response = await fetch(ability.ability.url);
          const data = await response.json();
          const description = obtenerDescripcionEnEspanol(data);
          return { name: data.name, desc: description, is_hidden: ability.is_hidden };
      } catch (error) {
          console.error('Error fetching ability data:', error);
          return null; // Manejar el error de manera adecuada según tus necesidades
      }
  });
  function obtenerDescripcionEnEspanol(data) {
    const flavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === "es");
    return flavorTextEntry ? flavorTextEntry.flavor_text : "Descripción no disponible";
}
        const abDesc = await Promise.all(abilityPromises);
        const abilities =abDesc.filter(ability => !ability.is_hidden);
        const hiddenability= abDesc.filter(ability=> ability.is_hidden);
        const caja = document.createElement('div');
        abilities.forEach((ability, index) => {
        const diva = document.createElement('p');
        diva.id = ability.name
        diva.style.margin='1px'
        diva.innerHTML = ability.name;
        const papa = document.createElement('span');
        papa.classList.add('popup_disable');
        papa.textContent =ability.desc
      diva.addEventListener('mouseenter',(event)=>{papa.classList.add("popup_enable")})
      diva.addEventListener('mouseleave',(event)=>{papa.classList.remove("popup_enable")})
      caja.appendChild(diva)
      caja.appendChild(papa)
      });
         const oculto = document.createElement('div');
        hiddenability.forEach((ability, index) => {
      const vadi = document.createElement('span');
      vadi.id = ability.name
      vadi.innerHTML = ability.name;
      const escondido = document.createElement('span');
      escondido.classList.add('popup_disable');
      escondido.textContent =ability.desc
     vadi.addEventListener('mouseenter',(event)=>{escondido.classList.add("popup_enable")})
     vadi.addEventListener('mouseleave',(event)=>{escondido.classList.remove("popup_enable")})
     oculto.appendChild(escondido)
     oculto.appendChild(vadi)
    });
     const contenedor=document.createElement('div')
      contenedor.classList.add('espacio');
         const abilitiesContainer = document.createElement('div');
       abilitiesContainer.innerHTML=`<strong>Habilidades</strong>`
        abilitiesContainer.classList.add('abilities-container');
      const hiddenabilitycontainer= document.createElement('div');
      hiddenabilitycontainer.classList.add('hiddenability-container');
     hiddenabilitycontainer.innerHTML=`<strong>Hab.oculta</strong>`
      contenedor.appendChild(hiddenabilitycontainer)
      pokemonInfo.appendChild(contenedor);
      abilitiesContainer.appendChild(caja);
         hiddenabilitycontainer.appendChild(oculto);
         contenedor.appendChild(abilitiesContainer);
      }
// Función para mostrar la información del Pokémon (Estadisticas base, nombre) en un flexbox.
async function displayPokemonInfo(pokemon) {
    const flex = document.querySelector("#flex-container");
    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');
    
    if (legendaryPokemonIds.includes(pokemon.id)) {
        flex.classList.add('golden-background-stats');
    }
    else{flex.classList.remove('golden-background-stats');}
    if (ultraentes.includes(pokemon.id)) {
        flex.classList.add('ultra-background-stats');
    }
       else{flex.classList.remove('ultra-background-stats');}

       if (megas.includes(pokemon.id)) {
        flex.classList.add('mega-background-stats');
    }
    else{flex.classList.remove('mega-background-stats');}

        // Obtener la información de estadísticas
        const stats = pokemon.stats.map(stat => {
        const statValue = stat.base_stat;
        const statName = stat.stat.name;
        const statNameSpanish = statNamesespañol[statName] || statName;
        // Calcular el ancho de la barra de color verde basado en el valor de la estadística
        const barWidth = (statValue / 255) * 100;
        return `
          <div class="stat-info">
          <div class="stat-name">${statNameSpanish}</div>
          <div class="stat-bar-container">
          <div class="stat-bar" style="width: ${barWidth}%;"></div>
          </div>
          <div class="stat-value">${statValue}</div>
          </div>
        `;
        }).join('');
        // Eliminar la información anterior del Pokémon si existe
        const previousPokemonInfo = document.querySelector('.pokemon-info');
        if (previousPokemonInfo) {
         previousPokemonInfo.remove();
         }
        habilidades(pokemon,pokemonInfo)
         // Agregar la información de estadísticas y habilidades al contenedor de información del Pokémon
        pokemonInfo.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img  src="${pokemon.sprites.front_default}" alt="${pokemon.name} image">
        <div class="stats-container">${stats}</div>
        `;

        
       const type = Elementos(pokemon)
       pokemonInfo.appendChild(type);
       const elegir=botoneq(pokemon)
       pokemonInfo.appendChild(elegir);
       flex.classList.add("unhidden")
    flex.appendChild(pokemonInfo);
}
document.addEventListener('click', function (event) {
  const flexContainer = document.getElementById('flex-container');
  const isClickInsideFlex = flexContainer.contains(event.target);
  const flex = document.querySelector("#flex-container");
  if (isClickInsideFlex && !flex.classList.contains("unhidden")) {
      // Si el clic ocurrió dentro del flexbox y el flexbox no está abierto, ábrelo
      flex.classList.add("unhidden");
  }
  // Agrega un botón de cierre dentro del flexbox con un ID "closeButton"
  const closeButton = document.getElementById('closeButton');
  if (closeButton && event.target === closeButton) {
      flex.classList.remove("unhidden");
  }
});
//Mostrar los tipos del pokemon en imagenes
const Elementos = (pokemon) => {
  const types= pokemon.types.map(type => {return "<img class='tamanio' src= 'TYPES/"+type.type.name+".png'/>"} ).join(', ');
  const typesContainer = document.createElement('div');
  typesContainer.classList.add('types-container');
  typesContainer.innerHTML = `${types}`;
  return typesContainer
}
//boton para añadir un pokemon al equipo
const botoneq=(pokemon)=>{
const addToTeamButton = document.createElement('button');
addToTeamButton.textContent = 'Agregar al equipo';
addToTeamButton.addEventListener('click', () => addToTeam(pokemon));
addToTeamButton.classList.add('btn');
return addToTeamButton
}
const teamContainer = document.querySelector('.team-container');
//tamaño maximo de pokemon para un equipo
const maxTeamSize = 6;
const team = [];
//Funcion para añadir pokemon al arreglo de team
function addToTeam(pokemon) {
  if (team.length < maxTeamSize) {
    team.push(pokemon);
    displayTeam();
  }
}


window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;

  // Ajusta el valor de 'threshold' según tus necesidades
  const threshold = 100;

  if (scrollPosition > threshold) {
      teamContainer.style.position = 'sticky';
      teamContainer.style.top = '0';
  } else {
      teamContainer.style.position = 'static';
  }
});


//Funcion para quitar pokemon del arreglo de team
function removeFromTeam(index) {
  if (index >= 0 && index < team.length) {
    team.splice(index, 1);
    displayTeam();
  }
}

//Funcion para mostrar los pokemon seleccionados en un flexbox
function displayTeam() {
    const teamGrid = document.querySelector('.team-grid');
    teamGrid.innerHTML = ''; 
    team.forEach((pokemon, index) => {
      const teamMember = document.createElement('div');
      teamMember.classList.add('team-member');
      teamMember.innerHTML = `
        <img id="${pokemon.name}-${index}" src="${pokemon.sprites.front_default}" alt="${pokemon.name} image">
      `;
      teamGrid.appendChild(teamMember);
        console.log(pokemon.name,index)
      console.log(document.querySelector(`#${pokemon.name}-${index}`));
      document.querySelector(`#${pokemon.name}-${index}`).addEventListener('click', () => removeFromTeam(index));
      document.querySelector(`#${pokemon.name}-${index}`).addEventListener('mouseenter', () => displayPokemonInfo(pokemon));
    });
    if (team.length <6) {
      
      const cantidad=6-team.length;
      for (let index = 0; index < cantidad; index++) {
        const teamMember = document.createElement('div');
        teamMember.classList.add('team-member');
        teamMember.innerHTML = `
          <img id="pokeball-${index}" src="TYPES/bola.png" alt="pokeball">
        `;
        teamGrid.appendChild(teamMember);
        
      }
    }

   
  }
/*Funcion para filtrar los pokemon por tipo, region, y si son legendarios o no (para el de legendarios se usa el array
con toda la lista de ellos)*/
function filterPokemon(selectedType, regionId, selectedOption) {
  pokedex.innerHTML = '';
  const typeFilteredPokemon = pokemonDataList.filter(pokemon => {
    if (selectedType === 'all') {
      return true;
    }
    return pokemon.types.some(pokemonType => pokemonType.type.name === selectedType);
  });
  const regionFilteredPokemon = typeFilteredPokemon.filter(pokemon => {
    if (regionId === 'all') {
      return true;
    }
    if (regionId === 'kanto') {
      return pokemon.id >= 0 && pokemon.id <= 151;
    }
    if (regionId === 'johto') {
      return pokemon.id >= 152 && pokemon.id <= 251;
    }if (regionId === 'hoenn') {
      return pokemon.id >= 252 && pokemon.id <= 386;
    }
    if (regionId === 'sinnoh') {
      return pokemon.id >= 387 && pokemon.id <= 494;
    }
    if (regionId === 'teselia') {
      return pokemon.id >= 495 && pokemon.id <= 649;
    }
    if (regionId === 'kalos') {
      return pokemon.id >= 650 && pokemon.id <= 721;
    }
    if (regionId === 'alola') {
      return pokemon.id >= 722 && pokemon.id <= 809;
    }
    if (regionId === 'galar') {
      return pokemon.id >= 810 && pokemon.id <= 898;
    }
    if (regionId === 'paldea') {
      return pokemon.id >= 906 && pokemon.id <= 1017;
    }
    if (regionId === 'hisui') {
      return pokemon.id >= 899 && pokemon.id <= 905;
    }

  });
  const legendaryFilteredPokemon = regionFilteredPokemon.filter(pokemon => {
    if (selectedOption === 'legendary') {
      return legendaryPokemonIds.includes(pokemon.id);
      
    } 
    if (selectedOption === 'megas') {
      return megas.includes(pokemon.id);
      
    } 
    else {
      return true;
    }
  });
  legendaryFilteredPokemon.forEach(pokemon => createPokemonCard(pokemon));
}
/*aca se toma en cuenta cada filtro seleccionado en la pagina para que actuen en base a las especificaciones del usuario.*/
const typeFilter = document.getElementById('typeFilter');
typeFilter.classList.add('bts');
typeFilter.addEventListener('change', () => {
  const selectedType = typeFilter.value;
  const selectedRegionId = regionFilter.value;
  const selectedOption = legendaryFilter.value;
  filterPokemon(selectedType, selectedRegionId, selectedOption);
  
});
const regionFilter = document.getElementById('regionFilter');
regionFilter.classList.add('bts');
regionFilter.addEventListener('change', () => {
  const selectedType = typeFilter.value;
  const selectedRegionId = regionFilter.value;
  const selectedOption = legendaryFilter.value;
  filterPokemon(selectedType, selectedRegionId, selectedOption);
});
const legendaryFilter = document.getElementById('legendaryFilter');
legendaryFilter.classList.add('bts');
legendaryFilter.addEventListener('change', () => {
  const selectedType = typeFilter.value;
  const selectedRegionId = regionFilter.value;
  const selectedOption = legendaryFilter.value;
  filterPokemon(selectedType, selectedRegionId, selectedOption);
});
//Funcion de busqueda
function searchPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    let filteredPokemonList = [...pokemonDataList];
    if (searchInput !== '') {
        filteredPokemonList = filteredPokemonList.filter(pokemon => {
            return pokemon.name.includes(searchInput);
        });
    }
    pokedex.innerHTML = '';
    filteredPokemonList.forEach(pokemon => {
        createPokemonCard(pokemon);
    });
}
document.getElementById('searchInput').addEventListener('input', searchPokemon);
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que se envíe el formulario
    searchPokemon();
});
fetchKantoPokemon();