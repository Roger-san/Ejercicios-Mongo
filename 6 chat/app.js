const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const mongoose = require("mongoose")

const PORT = 1006

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

app.post("/login", (req, res) => {

  res.cookie("userName", req.body.name).send()
})
app.post("/chat",(req,res)=>{
  // as
})
io.on("connection", (socket) => {
  socket.on("addNewMessage", (name, message) => {
    io.emit("paintMessage", name, message)
  })
})

app.use("/js", express.static(__dirname + "/public/js"))
app.use("/img", express.static(__dirname + "/public/img"))
app.use("/css", express.static(__dirname + "/public/css"))
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"))
app.use("/js", express.static(__dirname + "/node_modules/socket.io/client-dist"))
app.use(express.static(__dirname + "/public/html", {extensions: ["html"]}))

server.listen(PORT, () => {
  console.log(`api corriengo en el localhost:${PORT}`)
})
