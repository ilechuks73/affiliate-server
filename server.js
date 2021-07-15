const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const signup = require('./routes/register')
const signin = require('./routes/login')
const dashboard = require('./routes/dashboard')
const product = require('./routes/dashboard/product')
const order = require('./routes/dashboard/order')
const config = require('config')


//connect to a port
const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise
//DB config
const db = config.get('mongoURI')

//connect to database
mongoose.connect(db, 
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(() => {
            console.log('database connected successfully!')
        })
        .catch(err => {
            console.log(err)
        })
        
//allow cross-origin resource sharing 
app.use(cors())

//Middleware for processing form submission
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//global middleware for routes
app.use('/register', signup)
app.use('/login', signin)
app.use('/dashboard', dashboard)
app.use('/products', product)
app.use('/order', order)


//Error reporting
app.use((req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))