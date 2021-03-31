const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserChatSchema = new Schema(
  {
    name: String,
    message: [Object],
  },
  {versionKey: false}
)

module.exports = mongoose.model("UserChat", UserChatSchema)
