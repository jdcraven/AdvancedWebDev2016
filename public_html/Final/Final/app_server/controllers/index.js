
var Product = require('../models/product');

module.exports.index = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'Add Product',
            message : 'Product Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Product.create({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            price: req.body.price
        },function (err) {
            if (!err) {
                // saved!
                successCB();
                //resolve(' has been removed'); // success
            } else {
                res.render('index', {
                    title: 'Add Product',
                    message: err
                })
            }
           
           
        });
              
    } else {
         res.render('index', { 
            title: 'Add Product',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id;
         removed = '';
 
    function finish() {     
       Product
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View Products',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Product.remove({ _id: id }, function (err) {
                   if (!err) {
                        resolve(' has been removed'); // success
                    } else {
                        reject(' has not been removed'); // failure
                    }
               });                
                
            });
         
         
             removePromise.then(function(result) {
                 removed = id + result;
                 finish(); 
             }, function(result) {
                 removed = id + result;
                 finish();  
             });
           
                
     } else {
      finish();
    }
     
     
    
};

