module.exports = (app) => {
  const ventas = require('../controllers/ventas.controller.js')

  // Get all records
  app.get('/api/ventas', (req, res) => {
    ventas.findAll({ req, res })
  })

  // Search records
  app.get('/api/ventas/search', (req, res) => {
    ventas.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/ventas/:ID', (req, res) => {
    ventas.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/ventas', (req, res) => {
    ventas
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/ventas/:ID', (req, res) => {
    ventas
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/ventas/:ID', (req, res) => {
    ventas
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
