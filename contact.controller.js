const Contact = require("../models/contact.model.js");

// Create and Save a new Query
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Contact
  const contact = new Contact({
    profession:req.body.profession,
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
    datetime:req.body.datetime,
    msgbody:req.body.msgbody,
  });

  // Save Query in the database
  Contact.create(contact, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Query.",
      });
    else res.send(data);
  });
};

// Retrieve all Queries from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Contact.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving querys.",
      });
    else res.send(data);
  });
};

// Find a single Query by Id
exports.findOne = (req, res) => {
    Contact.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Query with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Query with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Query identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Contact.updateById(req.params.id, new Query(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Contact with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  Query.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contact with id " + req.params.id,
        });
      }
    } else res.send({ message: `Contact was deleted successfully!` });
  });
};

// Delete all Queries from the database.
exports.deleteAll = (req, res) => {
    Contact.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all querys.",
      });
    else res.send({ message: `All Queries were deleted successfully!` });
  });
};
