const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get("/get", (req, res, next) => {
    Task.find()
        .then(doc => {
            res.status(200).json({

                data: doc.map(val => {
                    return {
                        _id: val._id,
                        title: val.title,
                        subTask: val.subTask.map(val => val.st)
                    }
                })
            })
        })
})

router.get("/get/:id", (req, res, next) => {
    const id = req.params.id
    Task.findById(id)
        .then(doc => {
            res.status(201).json({
                title: doc.title,
                subTask: doc.subTask.map(val => val.st)

            })
        })
})

router.post("/post", (req, res, next) => {

    let Tasks = new Task({
        title: req.body.title,
        subTask: req.body.subTask,
    })
    Tasks.save().then(doc => {
        res.status(201).json({
            doc
        })
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router