const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const VentasSchema = mongoose.Schema(
  {
    Nombredelproducto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productos',
      autopopulate: true,
    },
    cantidad: Number,

    Precio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productos',
      autopopulate: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

VentasSchema.plugin(mongoosePaginate)
VentasSchema.index({
  Nombredelproducto: 'text',
  cantidad: 'text',
  Precio: 'text',
})

const myModel = (module.exports = mongoose.model('Ventas', VentasSchema, 'ventas'))
myModel.schema = VentasSchema
