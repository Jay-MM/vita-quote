const pokéForm = document.querySelector('form');
const pokéInput = document.getElementById('pokéName');
const pokéResult = document.getElementById('pokéResult');
const foxImg = document.getElementById('fox-img');
const kanyeSays = document.getElementById('kanye-quote');

function searchPokémon(e) {
  e.preventDefault()
  console.log('Initializing Pokémon Database...')
  // get value of input 
  console.log('Searching Pokémon DB for "' + pokéInput.value + '"')

  const pokémonName = pokéInput.value.trim().toLowerCase()

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
      // console.log(pokemon)
      // create elmnts
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      // modify elmnts
      h2.textContent = pokemon.name
      img.src = pokemon.sprites.front_default
      img.alt = pokemon.name
      // append to DOM
      pokéResult.append(h2)
      pokéResult.append(img)

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
  let img = document.createElement('img')
  img.src = foxImage.image
  img.alt = 'random fox image'
  img.classList.add('w-100')

  foxImg.append(img)
  
})


pokéForm.addEventListener('submit', searchPokémon)