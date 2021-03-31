const email = document.getElementById("email")
const password = document.getElementById("password")

const URL = "http://localhost:1005/api/users/register"

const register = () => {
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
      console.log("usuario registrado")
      window.location.href = "/login"
    })
    .catch((err) => console.log(err))
}
