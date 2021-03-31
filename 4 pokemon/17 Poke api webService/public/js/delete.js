const URL = "http://localhost:1013/api/pokemons"

const getAll = () => {
  fetch(URL)
    .then((data) => data.json())
    .then((pokemons) => {
      document.getElementById("ulPokemons").innerHTML = ""

      const ul = document.getElementById("ulPokemons")
      pokemons.pokemons.forEach((pokemon) => {
        const li = document.createElement("li")
        li.className = "list-group-item list-group-item-action"
        li.innerText = `${pokemon.name} - ${pokemon.type}`
        ul.appendChild(li)

        const button = document.createElement("button")
        button.id = pokemon.name
        button.innerText = "borrar"
        button.className = "btn btn-danger float-right"

        button.addEventListener("click", (event) => {
          deletePokemon(event.currentTarget.id)
        })

        li.appendChild(button)
      })
    })
    .catch((err) => console.log(err))
}
getAll()
const deletePokemon = (name) => {
  const opts = {
    method: "DELETE",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({name: name}),
  }
  fetch(URL, opts)
    .then((data) => data.json())
    .then((data) => {
      getAll()
    })
}
