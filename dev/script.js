// fetch('test.txt')
// .then(function(response){ return response.text()})
// .then((text)=> console.log(text))

// let docBody = document.body


// fetch('assets/pokemon-logo.png')
// .then(response => response.blob())
// .then(function(blob){
//   let img = document.createElement('img');
//   const objectURL = URL.createObjectURL(blob);
  
//   img.classList.add('object-fit-sm-contain', 'border', 'rounded', 'w-25')
//   img.src = objectURL;
  
//   docBody.insertBefore(img, docBody.firstChild);
// })


const pokéForm = document.querySelector('form');
const pokéInput = document.getElementById('pokéName');
const pokéResult = document.getElementById('pokéResult');
const foxImg = document.getElementById('fox-img');
const kanyeSays = document.getElementById('kanye-quote');

const selectedPokemons = {};

function searchPokémon(e) {
  e.preventDefault()
  console.log('Initializing Pokémon textbase...')
  // get value of input 
  console.log('Searching Pokémon DB for "' + pokéInput.value + '"')

  const pokémonName = pokéInput.value.trim().toLowerCase()

  // Check if the Pokemon has been selected once
  if (selectedPokemons[pokémonName] && selectedPokemons[pokémonName] >= 1) {
    alert('You can only select ' + pokémonName + ' once. Try searching for another.');
    pokéInput.value = ''
    return;
  }

  // fetch req to PokeAPI
  fetch('https://pokeapi.co/api/v2/pokemon/'+ pokémonName)
  .then(function (response) {
    if (response.status === 200) {
      // convert body to json
      console.log('found "' + pokémonName + '" in DB')
      return response.json()
      } else if (response.status === 404) {
        console.log('"'+ pokémonName + '" Not found')
        alert('"' + pokémonName + '" not found. Try Searching again')
        pokéInput.value = ''
      }
    })
    .then(function (pokemon) {
      // Increment the counter for the selected Pokemon
      selectedPokemons[pokémonName] = (selectedPokemons[pokémonName] || 0) + 1;

      // console.log(pokemon)

      // create elmnts
      let cardDiv = document.createElement('div')
      let cardBody = document.createElement('div')

      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let abilitiesList = document.createElement('ul')

      // modify elmnts
      cardDiv.classList.add('card', 'mb-3','col-md-3')
      cardBody.classList.add('card-body')
      
      h2.textContent = pokemon.name
      img.src = pokemon.sprites.front_default
      img.alt = pokemon.name
      img.classList.add('card-img-top')

      for (let i = 0; i < pokemon.abilities.length; i++) {
        var li = document.createElement('li')
        li.textContent = pokemon.abilities[i].ability.name
        abilitiesList.append(li)
      }
      // append to DOM
      cardBody.append(h2)
      cardBody.append(img)
      cardBody.append(abilitiesList)
      cardDiv.append(cardBody)
      pokéResult.append(cardDiv)

      pokéInput.value = ''

    })
}

fetch('https://api.kanye.rest')
.then(function (response) {
  if (response.status === 200) {
    return response.json()
  }else if (response.status === 404) {
    return console.error()
  }
})
.then(function(ye){
  let h2 = document.createElement('h2')
  h2.textContent = '"' + ye.quote + '"'
  kanyeSays.append(h2)
})

fetch('https://randomfox.ca/floof/')
.then(function(response){
  if (response.status === 200) {
    return response.json()
  }else if (response.status === 404) {
    return console.error()
  }
})
.then(function(foxImage) {
  let capDiv = document.createElement('div')
  let foxLink = document.createElement('a')
  let figure = document.createElement('figure')
  let img = document.createElement('img')
  let figCaption = document.createElement('figcaption')

  figCaption.textContent = 'Co-created by xinitrc'
  foxLink.href = 'https://randomfox.ca/'
  foxLink.target = '_blank'
  foxLink.textContent = 'click here  to see original site of fox images'

  capDiv.classList.add('d-flex', 'justify-content-between')

  img.src = foxImage.image
  img.alt = 'random fox image'
  img.classList.add('w-100')

  capDiv.append(figCaption)
  capDiv.append(foxLink)
  
  figure.append(img)
  figure.append(capDiv)
  foxImg.append(figure)
  
})


pokéForm.addEventListener('submit', searchPokémon)