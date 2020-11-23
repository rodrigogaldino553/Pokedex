const base_url = 'https://pokeapi.co/api/v2/pokemon/'


const search_input = get_element("#search-input")
const search_button = get_element("#search-btn")
const container = get_element("#container")
const search_container = get_element('.pokemon')
const erro_message = get_element(".error")

var poke_name;
var card;
var c = 150



function get_element(element) {
  return document.querySelector(element)
}

async function request_poke(name) {
  /*fetch(base_url + name)
   .then(response => response.json())
   .then(data => {
     console.log(data)
     pokemon = data
   })
   .catch(err => {
     alert(`${poke_name} not found!`)})*/

  //com async awat fica assim

  return await fetch(base_url + name).then(response => response.json())

}

function create_card(pokemon) {
  console.log(pokemon)
  card = `<div class="card poke-card ${pokemon.types[0].type.name.toString()}" style="width: 18rem;">
  <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="Sprite of ${pokemon.name}" class="card-img-top">
  <div class="card-body">
  <h5 class="card-title">${pokemon.id}.${pokemon.name}</h5>
  <h6 class="card-title">${pokemon.types.map(item => ' ' + item.type.name).toString()}</h6>
  
    <p class="card-text">
    ${pokemon.weight / 10}kg | ${pokemon.height / 10}m</p>
  </div>
</div>`
  /*</div>card = `
      <h3>Showing results for "${poke_name}"</h3>
      <div class="pokemon-picture">
        <img width="200px" height="200px" class="pokemon-sprite" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <h1 class="name">${pokemon.name}</h1>
        
        <h2 class="number">N° ${pokemon.id}</h2>
        <h3 class="type"><a id="title">Type:</a> ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
        <h3 class="skill"><a id="title">Skills:</a> ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight"><a id="title">Weight:</a> ${pokemon.weight / 10}kg</h3>
        <h3 class="height"><a id="title">Height:</a> ${pokemon.height / 10}m</h3>
      </div>`;*/

  return card
}

async function start_app() {
  container.innerHTML = ''
  search_container.innerHTML = `<h3>Show results for "${poke_name}":</h3>`
  //try {
    await request_poke(poke_name).then((response) => {
      setTimeout(function () {
        search_container.innerHTML += create_card(response)

      }, 2000)
    })
  /*} catch (error) {
    container.innerHTML = `Error! not was possible get ${poke_name}`
  }*/
}

search_button.addEventListener('click', event => {
  event.preventDefault()
  poke_name = search_input.value.toLowerCase()
  start_app(poke_name)

  container.classList.add('fade')
  setTimeout(() => {
    container.classList.remove('fade')
  }, 3000)
})


async function loadCards() {
  let poke = 1
  while(c > 0) {
    await request_poke(poke).then(function (response) {
      container.innerHTML += create_card(response)
    })
    c--
    poke ++
  }
}

loadCards()


