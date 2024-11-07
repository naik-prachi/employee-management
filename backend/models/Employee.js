const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  empID: String,
  firstName: String,
  lastName: String,
  empEmail: String,
  empDept: String,
});

console.log("table created");

// creates 'employees' table
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
