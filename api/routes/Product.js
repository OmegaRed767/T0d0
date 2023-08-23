const express = require('express')
const router = express.Router()
const ProductSch = require('../models/Product')

router.get("/get", (req, res, next) => {
    ProductSch.find()
        .then((doc) => {
            res.status(200).json({
                data: doc
            })
        })
})
router.get("/get/:id", (req, res, next) => {
    let id = req.params.id
    ProductSch.findById(id)
        .then(doc => {
            res.status(200).json({
                msg: "get method",
                id: doc
            })
        }).catch((err) => {
            res.status(404).json({
                msg: err
            })
        })

})



router.post("/post", (req, res, next) => {
    const Product = new ProductSch({
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc
    })

    Product.save().then(doc => {
        res.status(200).json({
            msg: "post method",
            createdProduct: Product
        })
    }).catch(err => {
        res.status(401).json({
            msg: "error creating",

        })
    })


})

router.delete("/delete/:id", (req, res, next) => {
    res.status(200).json({
        msg: `deleted product id-${req.params.id}`,

    })
})

module.exports = router