const sql = require("./db.js");

// constructor
const Syllabus = function (syllabus) {
  this.number = syllabus.number;
};

Syllabus.create = (newSyllabus, result) => {
  sql.query("INSERT INTO syllabuses SET ?", newSyllabus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created syllabus: ", { id: res.insertId, ...newSyllabus });
    result(null, { id: res.insertId, ...newSyllabus });
  });
};

Syllabus.findById = (id, result) => {
  sql.query(`SELECT * FROM syllabuses WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found syllabus: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Syllabus with the id
    result({ kind: "not_found" }, null);
  });
};

Syllabus.getAll = (number, result) => {
  let query = "SELECT * FROM syllabuses";

  if (number) {
    query += ` WHERE number LIKE '%${number}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("syllabuses: ", res);
    result(null, res);
  });
};

Syllabus.updateById = (id, syllabus, result) => {
  sql.query(
    "UPDATE syllabuses SET number = ? WHERE id = ?",
    [syllabus.number, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Syllabus with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated syllabus: ", { id: id, ...syllabus });
      result(null, { id: id, ...syllabus });
    }
  );
};

Syllabus.remove = (id, result) => {
  sql.query("DELETE FROM syllabuses WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Syllabus with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted syllabuses with id: ", id);
    result(null, res);
  });
};

Syllabus.removeAll = (result) => {
  sql.query("DELETE FROM syllabuses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} syllabuses`);
    result(null, res);
  });
};

module.exports = Syllabus;
