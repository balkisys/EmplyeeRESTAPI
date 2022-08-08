const db = require("../models");
//const employee = db.employees;
const Employee = db.employees;
// Create and Save a new employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  if (!req.body.firstName) {
    res.status(400).send({ message: "FirstName can not be empty!" });
    return;
  }
  if (!req.body.department) {
    res.status(400).send({ message: "Department can not be empty!" });
    return;
  }
  // Create a employee
  const employee = new Employee({
    name: req.body.name,
    firstName: req.body.firstName,
    department: req.body.department,
  });
  employee
    .save(employee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee.",
      });
    });
};
// Retrieve all employee from the database.
exports.findAll = (req, res) => {
  const department = req.query.department;
  var condition = department
    ? { department: { $regex: new RegExp(department), $options: "i" } }
    : {};
  Employee.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee.",
      });
    });
};
// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Employee.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found employee with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving employee with id=" + id });
    });
};
// Update a employee by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update employee with id=${id}. Maybe employee was not found!`,
        });
      } else res.send({ message: "employee was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating employee with id=" + id,
      });
    });
};
// Delete a employee with the specified id in the request
exports.delete = (req, res) => {};
// Delete all employee from the database.
exports.deleteAll = (req, res) => {};
// Find all published employee
exports.findAllPublished = (req, res) => {};
