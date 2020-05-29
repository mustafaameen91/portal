const sql = require("./db.js");

const MasterHistory = function (masterHistory) {
   this.masterKey = masterHistory.masterKey;
   this.students = masterHistory.students;
   this.lessons = masterHistory.lessons;
   this.marks = masterHistory.marks;
   this.sectionId = masterHistory.sectionId;
   this.class = masterHistory.class;
   this.level = masterHistory.level;
   this.year = masterHistory.year;
   this.leveltype = masterHistory.leveltype;
};

MasterHistory.create = (newMasterHistory, result) => {
   sql.query(
      "INSERT INTO masterHistory SET ?",
      newMasterHistory,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created masterHistory: ", {
            id: res.insertId,
            ...newMasterHistory,
         });
         result(null, { id: res.insertId, ...newMasterHistory });
      }
   );
};

MasterHistory.getAll = (result) => {
   sql.query("SELECT * FROM masterHistory", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("users: ", res);
      result(null, res);
   });
};

MasterHistory.findById = (historyId, result) => {
   sql.query(
      `SELECT * FROM masterHistory WHERE idHistory = ${historyId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found MasterHistory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterHistory.findByMasterKey = (masterKey, result) => {
   sql.query(
      `SELECT * , 'ok' AS message FROM masterHistory WHERE masterKey = '${masterKey}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found MasterHistory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterHistory.updateById = (id, masterHistory, result) => {
   sql.query(
      "UPDATE masterHistory SET ? WHERE idHistory = ?",
      [user, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated MasterHistory: ", { id: id, ...masterHistory });
         result(null, { id: id, ...masterHistory });
      }
   );
};

MasterHistory.remove = (id, result) => {
   sql.query(
      "DELETE FROM masterHistory WHERE idHistory = ?",
      id,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted MasterHistory with id: ", id);
         result(null, res);
      }
   );
};

module.exports = MasterHistory;
