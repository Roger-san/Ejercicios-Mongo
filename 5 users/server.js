const express = require("express")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const MY_SEED_AUTH = "MY_SEED_AUTH"
const URL =
  "mongodb+srv://administrador:administrador@cluster0.ocexd.mongodb.net/BBDD?retryWrites=true&w=majority"

const Users = require("./models/Users")

const PORT = 1005

const app = express()

const auth = (req, res, next) => {
  if (
    req.url.includes("/login") ||
    req.url.includes("/register") ||
    req.url.includes("/favicon")
  ) {
    next()
  } else {
    jwt.verify(req.cookies.token, MY_SEED_AUTH, (err, data) => {
      if (err) res.sendFile(__dirname + "/public/html/login.html")
      else {
        next()
      }
    })
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS")
    res.send()
  })
})
const opts = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(URL, opts, (err, res) => {
  if (err) console.error(err, opts, "fallo en la base de datos")
  else console.log("base de datos conectada")
})
app.use(cookieParser())

app.get("/api/users", (req, res) => {
  //cojemos el Schema Fruta para poder usarlo
  Users.find((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})
app.post("/api/users/login", (req, res) => {
  Users.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send("Fallo de login")
    if (!user) return res.status(403).send("Usuario u o contraseña incorrecta")
    if (user) {
      //compare compara si la contraseña no encriptada machea con la encriptada
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(500).send("Fallo de login")
        if (result) {
          const token = jwt.sign({ usuario: user }, MY_SEED_AUTH, { expiresIn: "24h" })
          console.log("login correcto")
          return res.cookie("token", token).status(200).send("login correcto")
        } else res.status(403).send("Usuario y o contraseña incorrectos")
      })
    }
  })
})
app.post("/api/users/register", (req, res) => {
  bcrypt.hash(req.body.password, 12).then((password) => {
    const newUser = { email: req.body.email, password: password }
    //data es el password haseado
    Users.create(newUser, (err, data) => {
      if (err) console.error(err)
      else {
        const token = jwt.sign({ usuario: data }, "asd", { expiresIn: "48h" })
        //
        console.log("usuario creado")
        res.cookie("token", token).status(200).send(data)
      }
    })
  })
  //el primer parametro elige que encriptar
  //el segundo el grado de encriptacion 12 es el estandar actual
  //cuanto mas alto mas requerira de la maquina
})

app.get("/cookie/del", (req, res) => {
  res.clearCookie("token")
})

app.use("/js", express.static(__dirname + "/public/js"))
app.use("/img", express.static(__dirname + "/public/img"))
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"))
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist/"))
app.use(auth, express.static(__dirname + "/public/html", { extensions: ["html"] }))

app.listen(PORT)
