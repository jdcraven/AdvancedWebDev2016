var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.employeesReadAll = function(req, res) {
        
    console.log('Getting all employees');
    Employee
     .find()
     .exec(function(err, results){
          if ( err ) {
              sendJSONresponse(res, 404, err);
          } else {
              sendJSONresponse(res, 200, results);
          }
     });

    
};



module.exports.employeesReadOne = function(req, res) {
    
    if (req.params && req.params.employeeid) {
      console.log('Getting single Employee with id =', req.params.employeeid );
      Employee
      .findById(req.params.employeeid)
      .exec(function(err, results){

          if ( results ) {
             sendJSONresponse(res, 200, results);
          } else {
              sendJSONresponse(res, 404, {
                "message": "employee id not found"
              });
          }

      });

    } else {
        sendJSONresponse(res, 404, {
            "message": "employee id not found"
        });
    }
};




/*   POST a new review
 *   /api/v1/reviews 
 */
module.exports.employeesCreate = function(req, res) {
    
    console.log('Creating a employee with data ', req.body);
    
    Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
    }, function(err, dataSaved) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(dataSaved);
          sendJSONresponse(res, 201, dataSaved);
        }
    });
  
  
};



module.exports.employeesUpdateOne = function(req, res) {
    
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employee wid is required"
    });
    return;
  }
  Employee
    .findById(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (!employeeData) {
          sendJSONresponse(res, 404, {
            "message": "employee id not found"
          });
          return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        employeeData.firstName = req.body.firstName;
        employeeData.lastName = req.body.lastName;
        employeeData.department = req.body.department;
        employeeData.startDate = req.body.startDate;
        employeeData.jobTitle = req.body.jobTitle;
        employeeData.salary = req.body.salary;

        employeeData.save(function(err, data) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, data);
          }
        });
    });
    
};


module.exports.employeesDeleteOne = function(req, res) {
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employeeid is required"
    });
    return;
  }
  Employee
    .findByIdAndRemove(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
          console.log("Employee id " + req.params.employeeid + " deleted");
          sendJSONresponse(res, 204, null);
                
    });
};
