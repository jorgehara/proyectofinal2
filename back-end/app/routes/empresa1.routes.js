module.exports = (app) => {
  const empresa1 = require('../controllers/empresa1.controller.js')

  // Get all records
  app.get('/api/empresa1', (req, res) => {
    empresa1.findAll({ req, res })
  })

  // Search records
  app.get('/api/empresa1/search', (req, res) => {
    empresa1.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/empresa1/:ID', (req, res) => {
    empresa1.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/empresa1', (req, res) => {
    empresa1
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/empresa1/:ID', (req, res) => {
    empresa1
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/empresa1/:ID', (req, res) => {
    empresa1
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
