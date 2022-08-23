module.exports = (app) => {
  const syllabus = require("../controllers/syllabus.controller.js");

  var router = require("express").Router();

  // Create a new syllabus
  router.post("/", syllabus.create);

  // Retrieve all syllabuses
  router.get("/", syllabus.findAll);

  // Retrieve a single syllabus with id
  router.get("/:id", syllabus.findOne);

  // Update a syllabus with id
  router.put("/:id", syllabus.update);

  // Delete a syllabus with id
  router.delete("/:id", syllabus.delete);

  // Delete all syllabuses
  router.delete("/", syllabus.deleteAll);

  app.use("/api/syllabuses", router);
};
