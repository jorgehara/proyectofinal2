const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductosSchema = mongoose.Schema(
  {
    marca: {
      type: String,
    },
    modelo: {
      type: String,
    },
    fechadecompra: Date,
    fechavencimiento: Boolean,
    paginaproducto: String,
    valoraciones: Number,
    descripciongral: {
      type: String,
    },
    Empresa1: [mongoose.Schema.Types.ObjectId],
    imagen: String,
    precio: Number,
    nombredelproducto: {
      type: String,
    },
    cantidadcomprada: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ProductosSchema.virtual('Ventas', {
  ref: 'Ventas',
  localField: '_id',
  foreignField: 'Nombre_del_producto',
  justOne: true,
  type: '',
})
ProductosSchema.virtual('Ventas', {
  ref: 'Ventas',
  localField: '_id',
  foreignField: 'Precio',
  justOne: true,
  type: '',
})

ProductosSchema.plugin(mongoosePaginate)
ProductosSchema.index({
  marca: 'text',
  modelo: 'text',
  fechadecompra: 'text',
  fechavencimiento: 'text',
  paginaproducto: 'text',
  valoraciones: 'text',
  descripciongral: 'text',
  Empresa1: 'text',
  imagen: 'text',
  precio: 'text',
  nombredelproducto: 'text',
  cantidadcomprada: 'text',
})

const myModel = (module.exports = mongoose.model('Productos', ProductosSchema, 'productos'))
myModel.schema = ProductosSchema
