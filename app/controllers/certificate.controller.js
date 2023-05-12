const Certificate = require("../models/certificate.model.js");

// Create and Save a new Certificate
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Certificate
  const certificate = new Certificate({
    certificateCode: req.body.certificateCode,
    completionDate: req.body.completionDate,
    enrollmentNo: req.body.enrollmentNo,
    candidateName: req.body.candidateName,
    datetime: req.body.datetime,
    title: req.body.title,
    duration: req.body.duration,
  });

  // Save Certificate in the database
  Certificate.create(certificate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Certificate.",
      });
    else res.send(data);
  });
};

// Retrieve all certificates from the database (with condition).
exports.findAll = (req, res) => {
  const enrollmentNo = req.query.enrollmentNo;

  Certificate.getAll(enrollmentNo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving certificates.",
      });
    else res.send(data);
  });
};

// Find a single Certificate by Id
exports.findOne = (req, res) => {
  Certificate.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Certificate with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Certificate with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Certificate identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Certificate.updateById(req.params.id, new Certificate(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Certificate with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Certificate with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Certificate with the specified id in the request
exports.delete = (req, res) => {
  Certificate.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Certificate with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Certificate with id " + req.params.id,
        });
      }
    } else res.send({ message: `Certificate was deleted successfully!` });
  });
};

// Delete all certificates from the database.
exports.deleteAll = (req, res) => {
  Certificate.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all certificates.",
      });
    else res.send({ message: `All certificates were deleted successfully!` });
  });
};
