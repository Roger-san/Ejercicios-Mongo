const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fetch = require("node-fetch")
const PORT = 1007

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS")
    res.send()
  })
})

app.post("/api/login", (req, res) => {
  const URL = "http://localhost:1006/api/login"
  const cookieData = {name: req.body.name}
  const opts = {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(cookieData),
  }
  fetch(URL, opts).then((data) => {
    console.log(cookieData)
  })
  // res.cookie("rememberme", "token").send("sdad")
})

app.listen(PORT, () => {
  console.log(`api corriendo en el localhost:${PORT}`)
})
