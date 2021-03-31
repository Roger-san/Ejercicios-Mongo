const page = (page = 1) => {
  const url = `http://localhost:1013/api/pokemons/page/${page}`
  fetch(url)
    .then((data) => data.json())
    .then((pokemons) => {
      printPokemons(pokemons)
      printList(pokemons)
    })
    .catch((err) => console.log(err))
}

const printPokemons = (pokemons) => {
  const ul = document.getElementById("ulPokemons")
  pokemons.Pokemons.forEach((pokemon) => {
    const li = document.createElement("li")
    li.className = "list-group-item list-group-item-action"
    li.innerHTML = `${pokemon.name} - ${pokemon.type}`
    ul.appendChild(li)
  })
}

const callPage = (event) => {
  const pag = document.getElementById("ulPokemons")
  pag.innerHTML = ""
  page(event.target.innerText)
}

const printList = (pokemons) => {
  const pag = document.getElementById("pagination")
  pag.innerHTML = ""
  for (x = 1; x <= pokemons.page; x++) {
    const li = document.createElement("li")
    li.className = "page-item"
    pag.appendChild(li)

    const a = document.createElement("a")
    a.className = "page-link"
    a.innerText = x
    a.addEventListener("click", (event) => callPage(event))
    li.appendChild(a)
  }
}

page()
