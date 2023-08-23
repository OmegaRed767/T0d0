const express = require('express')
const app = express()
const productRoutes = require("./api/routes/Product")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://raakesh210:${process.env.pass}@cluster0.6yg6iek.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/product", productRoutes)

app.use((req, res, next) => {
    let error = new Error("error has occured")
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status).json({
        msg: err.message
    })
})
module.exports = app


