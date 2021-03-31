const register = () => {
  window.sessionStorage.name = cookieData.name
  window.location.href = "/chat"
}
const sendMessage = () => {
  if (input.value.length === 0) return (input.placeholder = "Tienes que poner algo")
}
const input = document.getElementById("name")
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    register()
  }
})
input.addEventListener("click", (event) => {
  register()
})
