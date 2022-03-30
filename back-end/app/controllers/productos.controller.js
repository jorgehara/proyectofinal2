const Productos = require('../models/productos.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Producto
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.marca !== 'undefined') updatedData['marca'] = data.marca

  if (typeof data.modelo !== 'undefined') updatedData['modelo'] = data.modelo

  if (typeof data.fechadecompra !== 'undefined') updatedData['fechadecompra'] = data.fechadecompra

  if (typeof data.fechavencimiento !== 'undefined') updatedData['fechavencimiento'] = data.fechavencimiento

  if (typeof data.paginaproducto !== 'undefined') updatedData['paginaproducto'] = data.paginaproducto

  if (typeof data.valoraciones !== 'undefined') updatedData['valoraciones'] = data.valoraciones

  if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

  updatedData['Empresa1'] = []
  try {
    const Empresa1 = require('../controllers/empresa1.controller.js')
    let ReceivedEmpresa1 = typeof data.Empresa1 === 'string' ? JSON.parse(data.Empresa1) : data.Empresa1
    Empresa1Raw = Array.isArray(ReceivedEmpresa1) ? ReceivedEmpresa1 : [ReceivedEmpresa1]
    Empresa1Raw.forEach((Empresa1info) => {
      const Empresa1Files = {}

      if (!Empresa1info._id) {
        const Empresa1ID = require('mongoose').Types.ObjectId()

        Object.keys(Empresa1info).forEach((info) => {
          if (Empresa1info[info] && typeof Empresa1info[info] === 'object' && typeof Empresa1info[info].nombre === 'string') {
            Empresa1Files[info] = Empresa1info[info]
          }
        })

        let req = options.req
        req.body = { ...Empresa1info, _id: Empresa1ID }
        req.files = { ...Empresa1Files }
        Empresa1.createAsPromise({ req, res: options.res })
        updatedData['Empresa1'].push(Empresa1ID)
      } else {
        updatedData['Empresa1'].push(Empresa1info._id)
      }
    })
  } catch (e) {
    updatedData['Empresa1'] = data.Empresa1
  }

  if (options.req.files && options.req.files.imagen && options.req.files.imagen.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagen.name}`, options.req.files.imagen.data)
    updatedData['imagen'] = options.req.files.imagen.name
  }
  if (typeof data.Precio !== 'undefined') updatedData['Precio'] = data.Precio

  if (typeof data.nombredelproducto !== 'undefined') updatedData['nombredelproducto'] = data.nombredelproducto

  if (typeof data.cantidadcomprada !== 'undefined') updatedData['cantidadcomprada'] = data.cantidadcomprada

  // Create a Producto
  const Producto = new Productos(updatedData)

  // Save Producto in the database
  Producto.save()
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

    if (typeof data.marca !== 'undefined') updatedData['marca'] = data.marca

    if (typeof data.modelo !== 'undefined') updatedData['modelo'] = data.modelo

    if (typeof data.fechadecompra !== 'undefined') updatedData['fechadecompra'] = data.fechadecompra

    if (typeof data.fechavencimiento !== 'undefined') updatedData['fechavencimiento'] = data.fechavencimiento

    if (typeof data.paginaproducto !== 'undefined') updatedData['paginaproducto'] = data.paginaproducto

    if (typeof data.valoraciones !== 'undefined') updatedData['valoraciones'] = data.valoraciones

    if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

    updatedData['Empresa1'] = []
    try {
      const Empresa1 = require('../controllers/empresa1.controller.js')
      let ReceivedEmpresa1 = typeof data.Empresa1 === 'string' ? JSON.parse(data.Empresa1) : data.Empresa1
      Empresa1Raw = Array.isArray(ReceivedEmpresa1) ? ReceivedEmpresa1 : [ReceivedEmpresa1]
      Empresa1Raw.forEach((Empresa1info) => {
        const Empresa1Files = {}

        if (!Empresa1info._id) {
          const Empresa1ID = require('mongoose').Types.ObjectId()

          Object.keys(Empresa1info).forEach((info) => {
            if (Empresa1info[info] && typeof Empresa1info[info] === 'object' && typeof Empresa1info[info].nombre === 'string') {
              Empresa1Files[info] = Empresa1info[info]
            }
          })

          let req = options.req
          req.body = { ...Empresa1info, _id: Empresa1ID }
          req.files = { ...Empresa1Files }
          Empresa1.createAsPromise({ req, res: options.res })
          updatedData['Empresa1'].push(Empresa1ID)
        } else {
          updatedData['Empresa1'].push(Empresa1info._id)
        }
      })
    } catch (e) {
      updatedData['Empresa1'] = data.Empresa1
    }

    if (options.req.files && options.req.files.imagen && options.req.files.imagen.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagen.name}`, options.req.files.imagen.data)
      updatedData['imagen'] = options.req.files.imagen.name
    }
    if (typeof data.Precio !== 'undefined') updatedData['Precio'] = data.Precio

    if (typeof data.nombredelproducto !== 'undefined') updatedData['nombredelproducto'] = data.nombredelproducto

    if (typeof data.cantidadcomprada !== 'undefined') updatedData['cantidadcomprada'] = data.cantidadcomprada

    // Create a Producto
    const Producto = new Productos(updatedData)

    // Save Producto in the database
    Producto.save()
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

// Retrieve and return all Productos from the database.
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

  Productos.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Empresa1') > -1) && {
        strictPopulate: false,
        model: 'Empresa1',
        path: 'Empresa1',
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
        strictPopulate: false,
        path: 'Ventas',
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
        strictPopulate: false,
        path: 'Ventas',
      }
    )

    .then((productos) => {
      options.res.json(paginate.paginate(productos, { page: query.page, limit: query.limit || 10 }))
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
      if (Productos.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Productos.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Productos.schema.path(query.searchField).instance === 'ObjectID' || Productos.schema.path(query.searchField).instance === 'Array') {
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

    Productos.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Empresa1') > -1) && {
          strictPopulate: false,
          model: 'Empresa1',
          path: 'Empresa1',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
        }
      )

      .then((producto) => {
        resolve(paginate.paginate(producto, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Producto with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Productos.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Empresa1') > -1) && {
          strictPopulate: false,
          model: 'Empresa1',
          path: 'Empresa1',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
        }
      )

      .then((producto) => {
        if (!producto) {
          return options.res.status(404).send({
            message: 'Producto not found with id ' + id,
          })
        }
        resolve(paginate.paginate([producto]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Producto not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Producto with id ' + id,
        })
      })
  })
}

// Update a producto identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.marca !== 'undefined') updatedData['marca'] = data.marca

    if (typeof data.modelo !== 'undefined') updatedData['modelo'] = data.modelo

    if (typeof data.fechadecompra !== 'undefined') updatedData['fechadecompra'] = data.fechadecompra

    if (typeof data.fechavencimiento !== 'undefined') updatedData['fechavencimiento'] = data.fechavencimiento

    if (typeof data.paginaproducto !== 'undefined') updatedData['paginaproducto'] = data.paginaproducto

    if (typeof data.valoraciones !== 'undefined') updatedData['valoraciones'] = data.valoraciones

    if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

    updatedData['Empresa1'] = []
    try {
      const Empresa1 = require('../controllers/empresa1.controller.js')
      let ReceivedEmpresa1 = typeof data.Empresa1 === 'string' ? JSON.parse(data.Empresa1) : data.Empresa1
      Empresa1Raw = Array.isArray(ReceivedEmpresa1) ? ReceivedEmpresa1 : [ReceivedEmpresa1]
      Empresa1Raw.forEach((Empresa1info) => {
        const Empresa1Files = {}

        if (!Empresa1info._id) {
          const Empresa1ID = require('mongoose').Types.ObjectId()

          Object.keys(Empresa1info).forEach((info) => {
            if (Empresa1info[info] && typeof Empresa1info[info] === 'object' && typeof Empresa1info[info].nombre === 'string') {
              Empresa1Files[info] = Empresa1info[info]
            }
          })

          let req = options.req
          req.body = { ...Empresa1info, _id: Empresa1ID }
          req.files = { ...Empresa1Files }
          Empresa1.createAsPromise({ req, res: options.res })
          updatedData['Empresa1'].push(Empresa1ID)
        } else {
          updatedData['Empresa1'].push(Empresa1info._id)
        }
      })
    } catch (e) {
      updatedData['Empresa1'] = data.Empresa1
    }

    if (options.req.files && options.req.files.imagen && options.req.files.imagen.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagen.name}`, options.req.files.imagen.data)
      updatedData['imagen'] = options.req.files.imagen.name
    }
    if (typeof data.Precio !== 'undefined') updatedData['Precio'] = data.Precio

    if (typeof data.nombredelproducto !== 'undefined') updatedData['nombredelproducto'] = data.nombredelproducto

    if (typeof data.cantidadcomprada !== 'undefined') updatedData['cantidadcomprada'] = data.cantidadcomprada

    // Find Producto and update it with the request body
    const query = { populate: 'true' }
    Productos.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Empresa1') > -1) && {
          strictPopulate: false,
          model: 'Empresa1',
          path: 'Empresa1',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Ventas') > -1) && {
          strictPopulate: false,
          path: 'Ventas',
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

// Delete a producto with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Productos.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
