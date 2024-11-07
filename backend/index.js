const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json()); // passing frontend data to the backend
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Employee");

// req (request) comes from the frontend, res (respond) is sent to frontend
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success!");
      } else {
        res.json("sorry, the password is incorrect!");
      }
    } else {
      res.json("Record doesn't exist!");
    }
  });
});

// to add employees
app.post("/register", (req, res) => {
  console.log("Received request body:", req.body);
  EmployeeModel.create(req.body)
    .then((Employee) => res.json(Employee))
    .catch((err) => {
      console.error("Error creating employee:", err);
      console.log("post is running...");
      res.status(500).json({ error: "An error occurred" });
    });
});

// to retrieve employees
app.get("/getEmployee", (req, res) => {
  EmployeeModel.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// to dleete a record
app.delete("/deleteEmployee/:empID", (req, res) => {
  const { empID } = req.params;
  Employee.findOneAndDelete({ empID: empID })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "Employee not found" });
      }
      res.status(200).send({ message: "Employee deleted successfully" });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error deleting employee." })
    );
});

// to submit edited details
app.put("/editEmployee/:empID", (req, res) => {
  const { empID } = req.params;
  const updatedEmployee = req.body; // Employee data sent in the body

  Employee.findOneAndUpdate({ empID: empID }, updatedEmployee, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(updated); // Respond with the updated employee data
    })
    .catch((err) => {
      console.error("Error updating employee:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// to search employee by empID, firstName
// app.get("/searchEmployee/:empID/:firstName", (req, res) => {
//   const { empID, firstName } = req.params;
//   EmployeeModel.find({ empID: empID, firstName: firstName })
//     .then((employees) => res.json(employees))
//     .catch((err) => res.json(err));
// });

app.getEmp = (req, res) => {
  EmployeeModel.getEmp(req.params.firstName, (err, employee) => {
    if (err) res.send(err);
    console.log("emp data", employee);
    res.send(employee);
  });
};

app.listen(3001, () => {
  console.log("server is running...");
});
