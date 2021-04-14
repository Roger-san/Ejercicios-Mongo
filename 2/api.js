const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Fruta = require("./models/Fruta")

const URL =
  "mongodb+srv://admin:admin@cluster0.ocexd.mongodb.net/BBDD?retryWrites=true&w=majority"
const PORT = 1001

const api = express()

//api config
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
  api.options("*", (req, res) => {
    // allowed XHR methods
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS")
    res.send()
  })
})
//mongoose config
const opts = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(URL, opts, (err, res) => {
  if (err) console.error(err, opts, "fallo en la base de datos")
  else console.log("base de datos conectada")
})

api.get("/api/frutas", (req, res) => {
  //cojemos el Schema Fruta para poder usarlo
  Fruta.find((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

api.get("/api/frutas/:id", (req, res) => {
  //cojemos el Schema Fruta para poder usarlo
  Fruta.findById(req.params.id, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

api.get("/api/frutas/name/:name", (req, res) => {
  //cojemos el Schema Fruta para poder usarlo
  Fruta.findOne({ name: req.params.name }, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

api.post("/api/frutas/", (req, res) => {
  // creamos un nuevo Schema con los datos que nos da body
  const newFruta = new Fruta({
    name: req.body.name,
    qty: req.body.qty,
    size: req.body.size,
    color: req.body.color
  })
  // salva el nuevo Schema en la database
  newFruta.save((err) => {
    if (err) console.error(err)
    else
      res.send({
        succes: true,
        message: "nueva fruta añadida",
        newFruta
      })
  })
})

api.put("/api/frutas/:id", (req, res) => {
  // creamos un nuevo Schema con los datos que nos da body

  Fruta.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
    // el primer param busca por id
    // el segundo como va a actualizar
    if (err) res.status(500).send(err.message)
    else
      res.status(201).send({
        success: true,
        message: "todo correcto",
        data
      })
  })

  const newFruta = new Fruta({
    name: req.body.name,
    qty: req.body.qty,
    size: req.body.size,
    color: req.body.color
  })
  // salva el nuevo Schema en la database
  newFruta.save((err) => {
    if (err) console.error(err)
    else
      res.send({
        succes: true,
        message: "nueva fruta añadida",
        newFruta
      })
  })
})

api.delete("/api/frutas/:id", (req, res) => {
  Fruta.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) res.status(500).send(err)
    if (data) {
      res.status(200).send({ method: "delete", succes: true, message: "datos borrados" })
    }
  })
})

api.listen(PORT, () => {
  console.log(`server runing in localhost:${PORT}`)
})
