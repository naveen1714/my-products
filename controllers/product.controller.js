const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.product_details = (req, res) => {
    Product.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "data not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "data not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving data with id " + req.params.id
            });
        });
};

exports.products_findAll = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.product_update = function (req, res) {
    if (!req.bodyname && !req.body.price) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }

    // Find data and update it with the request body
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "sample",
        price: req.body.price
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating data with id " + req.params.id
            });
        });
};

exports.product_delete = function (req, res) {

    // Find data and delete it
    Product.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating data with id " + req.params.id
            });
        });
};