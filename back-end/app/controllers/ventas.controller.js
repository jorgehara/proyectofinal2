const Ventas = require('../models/ventas.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Venta
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  updatedData['Nombredelproducto'] = {}
  try {
    const Productos = require('../models/productos.model.js')
    let ReceivedNombredelproducto = typeof data.Nombredelproducto === 'string' ? JSON.parse(data.Nombredelproducto) : data.Nombredelproducto
    Nombredelproductoinfo = Array.isArray(ReceivedNombredelproducto) ? ReceivedNombredelproducto[0] : ReceivedNombredelproducto
    if (!Nombredelproductoinfo._id) {
      const NombredelproductoID = require('mongoose').Types.ObjectId()
      const Producto = new Productos({ ...Nombredelproductoinfo, _id: NombredelproductoID })
      Producto.save()
      updatedData['Nombredelproducto'] = NombredelproductoID
    } else {
      updatedData['Nombredelproducto'] = Nombredelproductoinfo._id
    }
  } catch (e) {
    updatedData['Nombredelproducto'] = data.Nombredelproducto
  }

  if (typeof data.cantidad !== 'undefined') updatedData['cantidad'] = data.cantidad

  updatedData['Precio'] = {}
  try {
    const Productos = require('../models/productos.model.js')
    let ReceivedPrecio = typeof data.Precio === 'string' ? JSON.parse(data.Precio) : data.Precio
    Precioinfo = Array.isArray(ReceivedPrecio) ? ReceivedPrecio[0] : ReceivedPrecio
    if (!Precioinfo._id) {
      const PrecioID = require('mongoose').Types.ObjectId()
      const Producto = new Productos({ ...Precioinfo, _id: PrecioID })
      Producto.save()
      updatedData['Precio'] = PrecioID
    } else {
      updatedData['Precio'] = Precioinfo._id
    }
  } catch (e) {
    updatedData['Precio'] = data.Precio
  }

  // Create a Venta
  const Venta = new Ventas(updatedData)

  // Save Venta in the database
  Venta.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise((resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    updatedData['Nombredelproducto'] = {}
    try {
      const Productos = require('../models/productos.model.js')
      let ReceivedNombredelproducto = typeof data.Nombredelproducto === 'string' ? JSON.parse(data.Nombredelproducto) : data.Nombredelproducto
      Nombredelproductoinfo = Array.isArray(ReceivedNombredelproducto) ? ReceivedNombredelproducto[0] : ReceivedNombredelproducto
      if (!Nombredelproductoinfo._id) {
        const NombredelproductoID = require('mongoose').Types.ObjectId()
        const Producto = new Productos({ ...Nombredelproductoinfo, _id: NombredelproductoID })
        Producto.save()
        updatedData['Nombredelproducto'] = NombredelproductoID
      } else {
        updatedData['Nombredelproducto'] = Nombredelproductoinfo._id
      }
    } catch (e) {
      updatedData['Nombredelproducto'] = data.Nombredelproducto
    }

    if (typeof data.cantidad !== 'undefined') updatedData['cantidad'] = data.cantidad

    updatedData['Precio'] = {}
    try {
      const Productos = require('../models/productos.model.js')
      let ReceivedPrecio = typeof data.Precio === 'string' ? JSON.parse(data.Precio) : data.Precio
      Precioinfo = Array.isArray(ReceivedPrecio) ? ReceivedPrecio[0] : ReceivedPrecio
      if (!Precioinfo._id) {
        const PrecioID = require('mongoose').Types.ObjectId()
        const Producto = new Productos({ ...Precioinfo, _id: PrecioID })
        Producto.save()
        updatedData['Precio'] = PrecioID
      } else {
        updatedData['Precio'] = Precioinfo._id
      }
    } catch (e) {
      updatedData['Precio'] = data.Precio
    }

    // Create a Venta
    const Venta = new Ventas(updatedData)

    // Save Venta in the database
    Venta.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Ventas from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Ventas.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
        strictPopulate: false,
        model: 'Productos',
        path: 'Nombre_del_producto',
        populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
        strictPopulate: false,
        model: 'Productos',
        path: 'Precio',
        populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
      }
    )
    .then((ventas) => {
      options.res.json(paginate.paginate(ventas, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Ventas.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Ventas.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Ventas.schema.path(query.searchField).instance === 'ObjectID' || Ventas.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Ventas.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Nombre_del_producto',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Precio',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )
      .then((venta) => {
        resolve(paginate.paginate(venta, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Venta with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Ventas.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Nombre_del_producto',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Precio',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )
      .then((venta) => {
        if (!venta) {
          return options.res.status(404).send({
            message: 'Venta not found with id ' + id,
          })
        }
        resolve(paginate.paginate([venta]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Venta not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Venta with id ' + id,
        })
      })
  })
}

// Update a venta identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    updatedData['Nombredelproducto'] = {}
    try {
      const Productos = require('../models/productos.model.js')
      let ReceivedNombredelproducto = typeof data.Nombredelproducto === 'string' ? JSON.parse(data.Nombredelproducto) : data.Nombredelproducto
      Nombredelproductoinfo = Array.isArray(ReceivedNombredelproducto) ? ReceivedNombredelproducto[0] : ReceivedNombredelproducto
      if (!Nombredelproductoinfo._id) {
        const NombredelproductoID = require('mongoose').Types.ObjectId()
        const Producto = new Productos({ ...Nombredelproductoinfo, _id: NombredelproductoID })
        Producto.save()
        updatedData['Nombredelproducto'] = NombredelproductoID
      } else {
        updatedData['Nombredelproducto'] = Nombredelproductoinfo._id
      }
    } catch (e) {
      updatedData['Nombredelproducto'] = data.Nombredelproducto
    }

    if (typeof data.cantidad !== 'undefined') updatedData['cantidad'] = data.cantidad

    updatedData['Precio'] = {}
    try {
      const Productos = require('../models/productos.model.js')
      let ReceivedPrecio = typeof data.Precio === 'string' ? JSON.parse(data.Precio) : data.Precio
      Precioinfo = Array.isArray(ReceivedPrecio) ? ReceivedPrecio[0] : ReceivedPrecio
      if (!Precioinfo._id) {
        const PrecioID = require('mongoose').Types.ObjectId()
        const Producto = new Productos({ ...Precioinfo, _id: PrecioID })
        Producto.save()
        updatedData['Precio'] = PrecioID
      } else {
        updatedData['Precio'] = Precioinfo._id
      }
    } catch (e) {
      updatedData['Precio'] = data.Precio
    }

    // Find Venta and update it with the request body
    const query = { populate: 'true' }
    Ventas.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Nombre_del_producto',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          model: 'Productos',
          path: 'Precio',
          populate: [{ strictPopulate: false, model: 'Empresa1', path: 'Empresa1' }],
        }
      )
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a venta with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Ventas.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
