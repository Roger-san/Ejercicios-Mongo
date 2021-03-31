const express = require("express")
const app = express()

const PORT = 1017

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

app.use(express.static(__dirname + "/public"))

app.use(express.static(__dirname + "/public/html", {extensions: ["html"]}))

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"))

app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"))

app.listen(PORT, () => {
  console.log(`server corriendo en localhost:${PORT}`)
})
