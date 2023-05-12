const Syllabus = require("../models/syllabus.model.js");

// Create and Save a new Syllabus
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Syllabus
  const syllabus = new Syllabus({
    email: req.body.email,
    specialization: req.body.specialization,
    datetime: req.body.datetime,
  });

  // Save Syllabus in the database
  Syllabus.create(syllabus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Syllabus.",
      });
    else res.send(data);
  });
};

// Retrieve all syllabuses from the database (with condition).
exports.findAll = (req, res) => {
  const phone = req.query.phone;

  Syllabus.getAll(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving syllabuses.",
      });
    else res.send(data);
  });
};

// Find a single Syllabus by Id
exports.findOne = (req, res) => {
  Syllabus.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Syllabus with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Syllabus with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Syllabus identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Syllabus.updateById(req.params.id, new Syllabus(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Syllabus with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Syllabus with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Syllabus with the specified id in the request
exports.delete = (req, res) => {
  Syllabus.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Syllabus with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Syllabus with id " + req.params.id,
        });
      }
    } else res.send({ message: `Syllabus was deleted successfully!` });
  });
};

// Delete all syllabuses from the database.
exports.deleteAll = (req, res) => {
  Syllabus.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all syllabuses.",
      });
    else res.send({ message: `All syllabuses were deleted successfully!` });
  });
};
