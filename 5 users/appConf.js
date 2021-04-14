const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const URL =
  "mongodb+srv://admin:admin@cluster0.ocexd.mongodb.net/BBDD?retryWrites=true&w=majority"
const app = express()

const appInit = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
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
  const opts = { useNewUrlParser: true, useUnifiedTopology: true }
  mongoose.connect(URL, opts, (err, res) => {
    if (err) console.error(err, opts, "fallo en la base de datos")
    else console.log("base de datos conectada")
  })
}
module.exports = { appInit: appInit }
