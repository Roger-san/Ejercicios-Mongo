const email = document.getElementById("email")
const password = document.getElementById("password")

const URL = "http://localhost:1005/api/users/login"

const login = () => {
  const newUser = {
    email: email.value,
    password: password.value,
  }
  const opts = {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(newUser),
  }
  fetch(URL, opts)
    .then((user) => user.json())
    .then((user) => {
      console.log("login correcto")
      window.location.href = "/private"
    })
    .catch((err) => console.log(err))
}
