var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,   
    price: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;


