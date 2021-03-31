const mongoose = require("mongoose")

const Schema = mongoose.Schema

//los schema son utiles para introducir info en la base de datos

const frutaSchema = new Schema(
  {
    name: String,
    qty: Number,
    color: [String],
    size: {h: Number, w: Number},
  },
  {versionKey: false}
  // versionKey: false elimina la creacion de un parametro
  // adicional que es inecesario
)
// si color contubiera mas de un tipo se podria poner
// color:[Object]
// el cual vale para todos los tipos
module.exports = mongoose.model("Fruta", frutaSchema)

// coje los modelos de moongoose y los exporta con el nombre Fruta
// se usa camel case ya que se considera una clase
