const socket = io()
const chat = document.getElementById("chat")
const URL = "http://localhost:1006/chat"
let NAME = ""

const checkCookie = () => {
  if (document.cookie === "") {
    window.location.href = "/"
  } else NAME = document.cookie.split("=")[1].replace(/%20/g, " ")
}
chat.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage()
    moveChat()
  }
})
button.addEventListener("click", (event) => {
  sendMessage()
  moveChat()
})

const moveChat = () => {
  const li = document.getElementById("upperLi")
  if (ul.children.length >= 8) {
    li.style.marginTop = `-${(ul.children.length - 7) * 18.667}px`
  }
}

const sendMessage = () => {
  if (chat.value.length === 0) return (chat.placeholder = "Tienes que poner algo")
  socket.emit("addNewMessage", NAME, chat.value)
}

socket.on("paintMessage", (name, message) => {
  const ul = document.getElementById("ul")
  const li = document.createElement("li")
  ul.appendChild(li)
  if (ul.children.length === 1) li.id = "upperLi"
  li.innerHTML = `${String(name)}: ${message}`
  if (name === NAME) li.className = "color"
})

checkCookie()
