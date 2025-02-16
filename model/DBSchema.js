const mongoose = require('mongoose');

const userCollection = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{"timestamps": {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const employeeCollection = new mongoose.Schema({
    _id: {type: Object},
    f_name: {type: String, required: true},
    l_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    genderL: {type: String, enum: ['male', 'female', 'others']},
    designation: {type: String, required: true},
    salary: {type: Number, required: true, min: [1000, 'Salary must be at least 1000']},
    date_of_joining: {type: Date, required: true},
    department: {type: String, required: true},
    employee_photo: {type: String}
},
{"timestamps": {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const User = mongoose.model('User', userCollection);
const Employee = mongoose.model('Employee', employeeCollection);

module.exports = {User, Employee};