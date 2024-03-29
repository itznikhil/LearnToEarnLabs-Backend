const sql = require("./db.js");

// constructor
const Contact = function (contact) {
  this.profession = contact.profession;
  this.name = contact.name;
  this.email = contact.email;
  this.number = contact.number;
  this.datetime = contact.datetime;
  this.msgbody = contact.msgbody;
};

Contact.create = (newContact, result) => {
  sql.query("INSERT INTO contacts SET ?", newContact, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contact: ", { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  });
};

Contact.findById = (id, result) => {
  sql.query(`SELECT * FROM contacts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contact: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Contact with the id
    result({ kind: "not_found" }, null);
  });
};

Contact.getAll = (name, result) => {
  let query = "SELECT * FROM contacts";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("contacts: ", res);
    result(null, res);
  });
};

Contact.updateById = (id, updateContact, result) => {
  sql.query(
    "UPDATE contacts SET profession = ?, email = ?, name = ? WHERE id = ?",
    [updateContact.profession, updateContact.email, updateContact.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Contact with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contact: ", { id: id, ...updateContact });
      result(null, { id: id, ...updateContact });
    }
  );
};

Contact.remove = (id, result) => {
  sql.query("DELETE FROM contacts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Contact with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contacts with id: ", id);
    result(null, res);
  });
};

Contact.removeAll = (result) => {
  sql.query("DELETE FROM contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contacts`);
    result(null, res);
  });
};

module.exports = Contact;
