const sql = require("./db.js");

const StudentMaster = function (studentMaster) {
   this.studentId = studentMaster.studentId;
   this.masterId = studentMaster.masterId;
   this.note = studentMaster.note;
};

StudentMaster.create = (newStudentMaster, result) => {
   sql.query(
      "INSERT INTO studentMaster SET ?",
      newStudentMaster,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created studentMaster: ", {
            id: res.insertId,
            ...newStudentMaster,
         });
         result(null, { id: res.insertId, ...newStudentMaster });
      }
   );
};

StudentMaster.createMultiStudent = (newStudents, result) => {
   sql.query(
      "INSERT INTO studentMaster (studentId , masterId , note) VALUES ?",
      [
         newStudents.map((student) => [
            student.studentId,
            student.masterId,
            student.note,
         ]),
      ],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created student result: ", {
            id: res.insertId,
         });
         result(null, { id: res.insertId });
      }
   );
};

StudentMaster.getAll = (result) => {
   sql.query("SELECT * FROM studentMaster", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("studentMaster: ", res);
      result(null, res);
   });
};

StudentMaster.getQuery = (sqlQuery, result) => {
   sql.query(`${sqlQuery}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("find: ", res);
      result(null, res);
   });
};

StudentMaster.findById = (studentMasterId, result) => {
   sql.query(
      `SELECT * FROM studentMaster WHERE idStudentMaster = ${studentMasterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

StudentMaster.updateById = (id, studentMaster, result) => {
   sql.query(
      "UPDATE studentMaster SET ? WHERE idStudentMaster = ?",
      [studentMaster, id],
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

         console.log("updated studentMaster: ", { id: id, ...studentMaster });
         result(null, { id: id, ...studentMaster });
      }
   );
};

StudentMaster.remove = (id, result) => {
   sql.query(
      "DELETE FROM studentMaster WHERE idStudentMaster = ?",
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
      
         // sql.query("DELETE FROM markmaster WHERE studentId = ?" ,[id], (err,res) => {
         //    console.log("ALL MARKS DELETED FOR Student ID: " + id)
         // })
         console.log("deleted studentMaster with id: ", id);
         result(null, res);
      }
   );
};

module.exports = StudentMaster;
