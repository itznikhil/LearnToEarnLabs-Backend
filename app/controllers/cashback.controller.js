const Cashback = require("../models/cashback.model.js");

// Create and Save a new Cashback
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Cashback
  const cashback = new Cashback({
    receiptNo:req.body.receiptNo,
    enrollmentNo:req.body.enrollmentNo,
    accountNo:req.body.accountNo,
    ifscCode:req.body.ifscCode,
    datetime:req.body.datetime,  });

  // Save Cashback in the database
  Cashback.create(cashback, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cashback.",
      });
    else res.send(data);
  });
};

// Retrieve all cashbacks from the database (with condition).
exports.findAll = (req, res) => {
  const enrollmentNo = req.query.enrollmentNo;

  Cashback.getAll(enrollmentNo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cashbacks.",
      });
    else res.send(data);
  });
};

// Find a single Cashback by Id
exports.findOne = (req, res) => {
  Cashback.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cashback with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cashback with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Cashback identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Cashback.updateById(req.params.id, new Cashback(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cashback with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Cashback with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Cashback with the specified id in the request
exports.delete = (req, res) => {
  Cashback.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cashback with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cashback with id " + req.params.id,
        });
      }
    } else res.send({ message: `Cashback was deleted successfully!` });
  });
};

// Delete all cashbacks from the database.
exports.deleteAll = (req, res) => {
  Cashback.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cashbacks.",
      });
    else res.send({ message: `All cashbacks were deleted successfully!` });
  });
};
