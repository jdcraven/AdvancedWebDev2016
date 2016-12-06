
var request = require('request');



module.exports.employeePage = function(req, res) {
        
    var requestOptions = {
          url : 'http://localhost:3001/api/v1/employees',
          method : "GET",
          json : {},
          qs : {}
        };
        
  request( requestOptions, function(err, response, body) {
      var results = [];
      if (response.statusCode === 200 && body.length) {
        results = (body instanceof Array) ? body : [];        
      }
      res.render('index', { 
                   title: 'View Employees',
                   results : results
                 });
      
    }
  );
    
   
};
module.exports.employeeAddView = function(req, res) {
    res.render('add', { title: 'Add Employee' });
};
module.exports.employeeAdd = function(req, res) {
    
    var requestOptions = {
        url: 'http://localhost:3001/api/v1/employees',
        method : "POST",
        json: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        }        
    };
          
    request( requestOptions, function(err, response, body) {
     
      if (response.statusCode === 201) {
           res.render('add', { 
                   title: 'Add Employee',
                   message: 'Employee Saved'
                 });     
      } else {
            res.render('add', { 
                   title: 'Add Employee',
                   message: 'Employee not Saved' 
                 });
      }
    }
  );
}