const dotenv = require('dotenv')
dotenv.config({ path: './config/.env.development' })

const express = require('express')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const app = express()
app.set('filesFolder', __dirname + '/../dist/img')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest, authorization, *')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload())

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    // process.exit();
  })

require('./app/routes/empresa1.routes.js')(app)
require('./app/routes/productos.routes.js')(app)
require('./app/routes/ventas.routes.js')(app)
require('./app/routes/users.routes.js')(app)

const nodemailer = require('nodemailer')
var transport = {
  host: '1',
  port: '1',
  auth: {
    user: '1',
    pass: '1',
  },
}

var transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('All works fine, congratz!')
  }
})
app.use(express.json())
app.set('sendEmail', async function (emailDetails, extra) {
  var mail = {
    from: emailDetails.name,
    to: emailDetails.email,
    subject: emailDetails.subject,
    html: emailDetails.message,
  }

  if (typeof addICal === 'function' && extra && extra.sendWithIcal) {
    addICal(mail, extra)
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      return { msg: 'fail' }
    } else {
      return { msg: 'success' }
    }
  })
})
app.post('/api/sendEmail', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml
  const subject = req.body.subject
  res.json(app.get('sendEmail')({ name, email, message, subject }, req.body.extra))
})

app.use('/api/images', express.static('./uploads'))

module.exports = app
