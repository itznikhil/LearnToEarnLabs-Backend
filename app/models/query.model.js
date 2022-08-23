const sql = require("./db.js");

// constructor
const Query = function (query) {
  this.profession = query.profession;
  this.name = query.name;
  this.email = query.email;
  this.number = query.number;
};

Query.create = (newQuery, result) => {
  sql.query("INSERT INTO queries SET ?", newQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created query: ", { id: res.insertId, ...newQuery });
    result(null, { id: res.insertId, ...newQuery });
  });
};

Query.findById = (id, result) => {
  sql.query(`SELECT * FROM queries WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found query: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Query with the id
    result({ kind: "not_found" }, null);
  });
};

Query.getAll = (name, result) => {
  let query = "SELECT * FROM queries";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("queries: ", res);
    result(null, res);
  });
};

Query.updateById = (id, updateQuery, result) => {
  sql.query(
    "UPDATE queries SET profession = ?, email = ?, name = ? WHERE id = ?",
    [updateQuery.profession, updateQuery.email, updateQuery.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Query with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated query: ", { id: id, ...updateQuery });
      result(null, { id: id, ...updateQuery });
    }
  );
};

Query.remove = (id, result) => {
  sql.query("DELETE FROM queries WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Query with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted queries with id: ", id);
    result(null, res);
  });
};

Query.removeAll = (result) => {
  sql.query("DELETE FROM queries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} queries`);
    result(null, res);
  });
};

module.exports = Query;
