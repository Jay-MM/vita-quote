const pokéForm = document.querySelector('form')

function searchPokémon(e) {
  e.preventDefault()

  console.log('Searching Pokémon Database...')
}


pokéForm.addEventListener('submit', searchPokémon)