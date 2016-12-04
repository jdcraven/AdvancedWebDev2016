/* GET 'home info' page */


var Employee = require('../models/employee');

module.exports.home = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'Add Employee',
            message : 'Employee Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        },function (err) {
            if (!err) {
                // saved!
                successCB();
                //resolve(' has been removed'); // success
            } else {
                res.render('index', {
                    title: 'Add Employee',
                    message: err
                })
            }
           
           
        });
              
    } else {
         res.render('index', { 
            title: 'Add Employee',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id;
         removed = '';
 
    function finish() {     
       Employee
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View Employees',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Employee.remove({ _id: id }, function (err) {
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



module.exports.update = function(req, res){
    
    var id = req.params.id;
    var msg = '';
    if (req.method === 'POST') {
         
         id = req.body._id;
         var query = { '_id': req.body._id };
         var update = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        };
        var options = {};
        var callback = function(){};
        Employee.update(query, update, options, callback);
        msg = 'data has been updated';
     }
    
    
    Employee
    .findOne({ '_id': id })
    .exec(function(err, results){
    
         if ( results ) {
            res.render('update', { 
                title: 'Update Employee',
                message: msg,
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });
};


