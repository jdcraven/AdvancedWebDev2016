var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: {
        required: true,
        type: Date
    },
    jobTitle: String,
    salary: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});


var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;