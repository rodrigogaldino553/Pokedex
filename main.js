const base_url = 'https://pokeapi.co/api/v2/pokemon/'


const search_input = get_element("#search-input")
const search_button = get_element("#search-btn")
const form = get_element('#form')
const container = get_element("#container")
const search_container = get_element('.pokemon')
const erro_message = get_element(".error")

var click = false
var poke_name;
var card;
var c = 50
var loaded = false



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

  //com async await fica assim

  return await fetch(base_url + name).then(response => response.json())

}

function create_card(pokemon) {
  card = `<div class="card poke-card ${pokemon.types[0].type.name.toString()}" style="width: 18rem;">
  <img src="${pokemon.sprites.front_shiny}" alt="Sprite of ${pokemon.name}" class="card-img-top">
  <div class="card-body">
  <h5 class="card-title">${pokemon.id}.${pokemon.name}</h5>
  <h6 class="card-title">${pokemon.types.map(item => ' ' + item.type.name).toString()}</h6>
  
    <p class="card-text">
    ${pokemon.weight / 10}kg | ${pokemon.height / 10}m</p>
  </div>
  </div>`

  return card
}

async function start_app() {
  container.innerHTML = ''
  search_container.innerHTML = `<h3>Searching "${poke_name}"...`
  try {
    await request_poke(poke_name).then((response) => {
      setTimeout(function () {
        search_container.innerHTML = `<h3>Showing results for "${poke_name}":</h3>`
        search_container.innerHTML += create_card(response)
      }, 2000)
    })
  } catch (error) {
    showAlert(`Error! not was possible get "${poke_name}"`, 'alert-danger')
    search_container.innerHTML = `<h3>Error! can't get "${poke_name}"</h3>`
    //container.innerHTML = `<h3>Error! can't get "${poke_name}"</h3>`
  }
}

document.addEventListener("keydown", event => {
  if (event.key == 'Enter') {
    search_container.classList.remove('hide')
    container.style.display = 'none'
    event.preventDefault()
    poke_name = search_input.value.toLowerCase()
    start_app(poke_name)

    container.classList.add('fade')
    setTimeout(() => {
      container.classList.remove('fade')
    }, 3000)
  }
})
container.classList.add('.hide')

search_button.addEventListener('click', event => {
    search_container.classList.remove('hide')
    container.style.display = 'none'
    click = true
    event.preventDefault()
    poke_name = search_input.value.toLowerCase()
    start_app(poke_name)


})


function showAlert(text, alertClass) {
  const alertField = document.querySelector('#alert')
  alertField.classList.remove('hide')
  alertField.classList.add(alertClass)

  alertField.innerHTML = text
  setTimeout(() => {
    alertField.classList.add('hide')
    alertField.classList.add(alertClass)
  }, 5000)
}


async function loadCards() {
  let poke = 1
  while (c > 0 && !click) {
    await request_poke(poke).then(function (response) {
      container.innerHTML += create_card(response)
    })
    c--
    poke++
  }
  loaded = true
}

try {
  loadCards()
} catch (error) {
  showAlert('Error!! was not posible to load cards', 'alert-danger')
}

