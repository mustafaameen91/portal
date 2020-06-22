const sql = require("./db.js");

const NewMasterSheet = function (newMasterSheet) {
   this.sectionId = newMasterSheet.sectionId;
   this.level = newMasterSheet.level;
   this.class = newMasterSheet.class;
   this.year = newMasterSheet.year;
   this.studyType = newMasterSheet.studyType;
   this.masterTypeId = newMasterSheet.masterTypeId;
   this.course = newMasterSheet.course;
};

NewMasterSheet.create = (newMasterSheet, result) => {
   sql.query("INSERT INTO newMasterSheet SET ?", newMasterSheet, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created newMasterSheet: ", {
         id: res.insertId,
         ...newMasterSheet,
      });
      result(null, { id: res.insertId, ...newMasterSheet });
   });
};

NewMasterSheet.getAll = (result) => {
   sql.query("SELECT * FROM newMasterSheet", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("newMasterSheet: ", res);
      result(null, res);
   });
};

NewMasterSheet.getByFilter = (sqlQuery, result) => {
   sql.query(
      `SELECT * , (SELECT masterType.typeName FROM masterType WHERE masterType.idMasterType = masterTypeId) As masterTypeName , (SELECT COUNT(*) FROM studentMaster WHERE studentMaster.masterId = newMasterSheet.idNewMaster) As totalStudents FROM newMasterSheet WHERE 1=1 ${sqlQuery}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("newMasterSheet: ", res);
         result(null, res);
      }
   );
};

//SELECT * , (SELECT masterType.typeName FROM masterType WHERE masterType.idMasterType = masterTypeId) As masterTypeName , (SELECT COUNT(*) FROM studentMaster WHERE studentMaster.masterId = newMasterSheet.idNewMaster) As totalStudents FROM newMasterSheet WHERE sectionId = ? AND level = ? AND class = ? AND year = ?

NewMasterSheet.getQuery = (sqlQuery, result) => {
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

NewMasterSheet.findById = (idNewMaster, result) => {
   sql.query(
      `SELECT * FROM newMasterSheet WHERE idNewMaster = ${idNewMaster}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found newMasterSheet: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};
//SELECT * FROM newMasterSheet JOIN studentMaster JOIN student JOIN markMaster WHERE newMasterSheet.idNewMaster = studentMaster.masterId AND markMaster.studentId = studentMaster.studentId AND student.id = studentMaster.studentId AND newMasterSheet.idNewMaster = ${idNewMaster}
NewMasterSheet.findByMasterId = (idNewMaster, result) => {
   sql.query(
      `SELECT * FROM newMasterSheet WHERE idNewMaster = ${idNewMaster}`,
      (err, res) => {
         let data = {
            masterSheet: res[0],
         };
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            sql.query(
               `SELECT studentId , name , college_number FROM studentMaster JOIN student WHERE studentMaster.studentId = student.id AND masterId = ${res[0].idNewMaster}`,
               (err, res1) => {
                  if (err) {
                     console.log("error: ", err);
                     result(err, null);
                     return;
                  } else {
                     data.students = res1;
                     sql.query(
                        `SELECT markMaster.studentId , markMaster.lessonId , markMaster.idMarkMaster , markMaster.markType , markMaster.degree , markMaster.status FROM markMaster JOIN studentMaster WHERE markMaster.studentId = studentMaster.studentId AND markMaster.masterId = ${res[0].idNewMaster}`,
                        (err, res2) => {
                           if (err) {
                              console.log("error: ", err);
                              result(err, null);
                              return;
                           } else {
                              data.marks = res2;

                              result(null, data);
                           }
                        }
                     );
                  }
               }
            );

            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

NewMasterSheet.updateById = (idNewMaster, newMasterSheet, result) => {
   sql.query(
      "UPDATE newMasterSheet SET ? WHERE idNewMaster = ?",
      [newMasterSheet, idNewMaster],
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

         console.log("updated newMasterSheet: ", {
            id: idNewMaster,
            ...newMasterSheet,
         });
         result(null, { id: idNewMaster, ...newMasterSheet });
      }
   );
};

NewMasterSheet.remove = (idNewMaster, result) => {
   sql.query(
      "DELETE FROM newMasterSheet WHERE idNewMaster = ?",
      idNewMaster,
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

         console.log("deleted newMasterSheet with id: ", idNewMaster);
         result(null, res);
      }
   );
};

module.exports = NewMasterSheet;
