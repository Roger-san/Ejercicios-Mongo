const mongoose = require("mongoose")

const Schema = mongoose.Schema

const usersSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {versionKey: false}
)

module.exports = mongoose.model("Users", usersSchema)
