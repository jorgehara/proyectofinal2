const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Empresa1Schema = mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    razonsocial: {
      type: String,
    },
    direccion: {
      type: String,
    },
    descripciongral: {
      type: String,
    },
    contactocelu: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

Empresa1Schema.plugin(mongoosePaginate)
Empresa1Schema.index({
  nombre: 'text',
  razonsocial: 'text',
  direccion: 'text',
  descripciongral: 'text',
  contactocelu: 'text',
})

const myModel = (module.exports = mongoose.model('Empresa1', Empresa1Schema, 'empresa1'))
myModel.schema = Empresa1Schema
