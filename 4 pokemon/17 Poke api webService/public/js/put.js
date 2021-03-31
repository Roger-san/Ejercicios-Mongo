const searchPokemon = () => {
  const idPokemonSearch = document.getElementById("idPokemonSearch").value

  const idPokemon = document.getElementById("idPokemon")
  const namePokemon = document.getElementById("namePokemon")
  const typePokemon = document.getElementById("typePokemon")

  const url = `http://localhost:1013/api/pokemon?id=${idPokemonSearch}`
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      idPokemon
      idPokemon.value = data.pokemon[0].id
      namePokemon.value = data.pokemon[0].name
      typePokemon.value = data.pokemon[0].type
    })
    .catch((err) => console.error(`uups algo a pasado ${err}`))
}

const putPokemon = () => {
  const idPokemon = document.getElementById("idPokemonSearch")
  const putPokemon = {
    name: document.getElementById("namePokemon").value,
    type: document.getElementById("typePokemon").value,
  }
  const urlPut = `http://localhost:1013/api/pokemons/${idPokemon.value}`
  const opts = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(putPokemon),
  }
  fetch(urlPut, opts)
}
