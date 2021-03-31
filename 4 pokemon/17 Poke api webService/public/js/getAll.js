const URL = "http://localhost:1013/api/pokemons"

const getAll = () => {
  fetch(URL)
    .then((data) => data.json())
    .then((pokemons) => {
      console.log(pokemons.pokemons)
      const ul = document.querySelector("#ulPokemons")
      pokemons.pokemons.forEach((pokemon) => {
        const li = document.createElement("li")
        li.className = "list-group-item list-group-item-action"
        li.innerHTML = `${pokemon.name} - ${pokemon.type}`
        ul.appendChild(li)
      })
    })
    .catch((err) => console.log(err))
}
getAll()
// li.appendChild(document.createTextNode(pokemon.name))
