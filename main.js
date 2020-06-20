const base_url = 'https://pokeapi.co/api/v2/pokemon/'


const search_input = get_element(".search-input")
const search_button = get_element(".search-button")
const container = get_element(".pokemon")
const erro_message = get_element(".error")
      
var poke_name;
var card;
var pokemon;


function get_element(element) {
  return document.querySelector(element)
}

function request_poke(name){
  fetch(base_url + name)
   .then(response => response.json())
   .then(data => {
     console.log(data)
     pokemon = data
   })
   .catch(err => {
     alert(`${poke_name} not found!`)})
   
   
}

function create_card(){
  card = `
      <div class="pokemon-picture">
        <img id="pokemon-sprite" src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <h1 class="name">${pokemon.name}</h1>
        
        <h2 class="number">N° ${pokemon.id}</h2>
        <h3 class="type"><a id="title">Type:</a> ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
        <h3 class="skill"><a id="title">Skills:</a> ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight"><a id="title">Weight:</a> ${pokemon.weight /10}kg</h3>
        <h3 class="height"><a id="title">Height:</a> ${pokemon.height /10}m</h3>
      </div>`;
      
    return card
}

function start_app(){
  request_poke(poke_name)
  setTimeout(function(){
    container.innerHTML = create_card()
    
  }, 2000)
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
