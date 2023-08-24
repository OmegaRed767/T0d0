const express = require('express')
const app = express()
const productRoutes = require("./api/routes/Product")
const TaskRoutes = require("./api/routes/Tasks")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect(`mongodb+srv://raakesh210:${process.env.pass}@cluster0.6yg6iek.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!')).catch(err => console.log("err", err))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/product", productRoutes)
app.use("/Tasks", TaskRoutes)

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


