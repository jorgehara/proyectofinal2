const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const VentasSchema = mongoose.Schema(
  {
    Nombredelproducto: mongoose.Schema.Types.ObjectId,
    cantidad: Number,
    Precio: mongoose.Schema.Types.ObjectId,
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
