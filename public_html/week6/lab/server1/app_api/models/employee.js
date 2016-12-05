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

/* This model will also create the collection in the Loc8r database when used */
var Employee = mongoose.model('Employee', employeeSchema);

/*module.exports = Employee;*/
