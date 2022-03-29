const Empresa1 = require('../models/empresa1.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Empresa
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.nombre !== 'undefined') updatedData['nombre'] = data.nombre

  if (typeof data.razonsocial !== 'undefined') updatedData['razonsocial'] = data.razonsocial

  if (typeof data.direccion !== 'undefined') updatedData['direccion'] = data.direccion

  if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

  if (typeof data.contactocelu !== 'undefined') updatedData['contactocelu'] = data.contactocelu

  // Create a Empresa
  const Empresa = new Empresa1(updatedData)

  // Save Empresa in the database
  Empresa.save()
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

    if (typeof data.nombre !== 'undefined') updatedData['nombre'] = data.nombre

    if (typeof data.razonsocial !== 'undefined') updatedData['razonsocial'] = data.razonsocial

    if (typeof data.direccion !== 'undefined') updatedData['direccion'] = data.direccion

    if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

    if (typeof data.contactocelu !== 'undefined') updatedData['contactocelu'] = data.contactocelu

    // Create a Empresa
    const Empresa = new Empresa1(updatedData)

    // Save Empresa in the database
    Empresa.save()
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

// Retrieve and return all Empresa1 from the database.
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

  Empresa1.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
        strictPopulate: false,
        path: 'Productos',
        populate: [
          { model: 'Ventas', path: 'Ventas' },
          { model: 'Ventas', path: 'Ventas' },
        ],
      }
    )

    .then((empresa1) => {
      options.res.json(paginate.paginate(empresa1, { page: query.page, limit: query.limit || 10 }))
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
      if (Empresa1.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Empresa1.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Empresa1.schema.path(query.searchField).instance === 'ObjectID' || Empresa1.schema.path(query.searchField).instance === 'Array') {
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

    Empresa1.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          path: 'Productos',
          populate: [
            { model: 'Ventas', path: 'Ventas' },
            { model: 'Ventas', path: 'Ventas' },
          ],
        }
      )

      .then((empresa) => {
        resolve(paginate.paginate(empresa, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Empresa with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Empresa1.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          path: 'Productos',
          populate: [
            { model: 'Ventas', path: 'Ventas' },
            { model: 'Ventas', path: 'Ventas' },
          ],
        }
      )

      .then((empresa) => {
        if (!empresa) {
          return options.res.status(404).send({
            message: 'Empresa not found with id ' + id,
          })
        }
        resolve(paginate.paginate([empresa]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Empresa not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Empresa with id ' + id,
        })
      })
  })
}

// Update a empresa identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.nombre !== 'undefined') updatedData['nombre'] = data.nombre

    if (typeof data.razonsocial !== 'undefined') updatedData['razonsocial'] = data.razonsocial

    if (typeof data.direccion !== 'undefined') updatedData['direccion'] = data.direccion

    if (typeof data.descripciongral !== 'undefined') updatedData['descripciongral'] = data.descripciongral

    if (typeof data.contactocelu !== 'undefined') updatedData['contactocelu'] = data.contactocelu

    // Find Empresa and update it with the request body
    const query = { populate: 'true' }
    Empresa1.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Productos') > -1) && {
          strictPopulate: false,
          path: 'Productos',
          populate: [
            { model: 'Ventas', path: 'Ventas' },
            { model: 'Ventas', path: 'Ventas' },
          ],
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

// Delete a empresa with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Empresa1.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
