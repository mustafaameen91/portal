const sql = require("./db.js");

const NewMasterSheet = function (newMasterSheet) {
   this.sectionId = newMasterSheet.sectionId;
   this.level = newMasterSheet.level;
   this.class = newMasterSheet.class;
   this.year = newMasterSheet.year;
   this.studyType = newMasterSheet.studyType;
   this.masterTypeId = newMasterSheet.masterTypeId;
   this.course = newMasterSheet.course;
   this.note = newMasterSheet.note;
   this.downgrade = newMasterSheet.downgrade;
};

NewMasterSheet.create = (newMasterSheet, result) => {
   sql.query("INSERT INTO newmastersheet SET ?", newMasterSheet, (err, res) => {
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
   sql.query("SELECT * FROM newmastersheet", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("newMasterSheet: ", res);
      result(null, res);
   });
};

NewMasterSheet.getByTeacherId = (teacherId, result) => {
   sql.query(
      `SELECT (lesson.id) AS lessonId , (lesson.name) AS lessonName , lesson.sectionid , lesson.teacherid , lesson.credit , lesson.required , lesson.mgroupid , lesson.prevlesson , lesson.year , lesson.theoretical , lesson.practical , lesson.final , lesson.level , lesson.enName , lesson.thHoure , lesson.prHoure , lesson.course , lesson.practicalFinal , lesson.yearWorkT , lesson.yearWorkP , newmastersheet.idNewMaster ,  (SELECT type FROM level WHERE level.sectionId = lesson.sectionid AND level.year = lesson.year AND level.level = lesson.level ) AS levelType, newmastersheet.sectionId , newmastersheet.level , newmastersheet.class , newmastersheet.year , newmastersheet.studyType , newmastersheet.date , newmastersheet.masterTypeId , newMasterSheet.course , masterType.idMasterType , masterType.typeName , section.id , section.name FROM lesson JOIN newmastersheet JOIN mastertype JOIN section ON lesson.sectionid = newmastersheet.sectionId AND lesson.year = newmastersheet.year AND lesson.course = newmastersheet.course AND lesson.level = newmastersheet.level AND lesson.sectionid = section.id AND newmastersheet.masterTypeId = mastertype.idMasterType AND newmastersheet.masterTypeId = 1 AND  teacherid = ${teacherId} AND lesson.year = '2020-2021'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found newMasterSheet: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

NewMasterSheet.getByFilter = (sqlQuery, result) => {
   sql.query(
      `SELECT * , (SELECT masterType.typeName FROM masterType WHERE masterType.idMasterType = masterTypeId) As masterTypeName , (SELECT COUNT(*) FROM studentMaster WHERE studentMaster.masterId = newmastersheet.idNewMaster) As totalStudents FROM newmastersheet WHERE 1=1 ${sqlQuery}`,
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
      `SELECT *, (SELECT typeName FROM mastertype WHERE idMasterType = newmastersheet.masterTypeId) As masterTypeName FROM newmastersheet WHERE idNewMaster = ${idNewMaster}`,
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

NewMasterSheet.findStudentId = (stduentId, result) => {
   sql.query(
      `SELECT * FROM studentmaster WHERE studentId = ${stduentId}`,
      (err, res) => {
         if (err) {
            console.log(err);
            result(err, null);
            return;
         } else {
            if (res.length > 1) {
               result({ message: "double master sheet" });
               return;
            } else {
               result(null, res);
            }
         }
      }
   );
};

NewMasterSheet.findDegreeByMasterId = (idNewMaster, result) => {
   sql.query(
      `SELECT * FROM newmastersheet WHERE idNewMaster = ${idNewMaster}`,
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
               `SELECT idStudentMaster ,studentId , name ,email,sex, college_number ,note FROM studentmaster JOIN student WHERE studentMaster.studentId = student.id AND masterId = ${res[0].idNewMaster}`,
               (err, res1) => {
                  if (err) {
                     console.log("error: ", err);
                     result(err, null);
                     return;
                  } else {
                     data.students = res1;
                     sql.query(
                        `SELECT markmaster.studentId ,markmaster.masterId , markmaster.lessonId , markmaster.idMarkMaster , markmaster.markType , markmaster.degree , markmaster.status FROM markmaster JOIN studentmaster WHERE markmaster.studentId = studentmaster.studentId AND markmaster.markType != 'final1'AND markmaster.markType != 'final2' AND markmaster.masterId = ${res[0].idNewMaster}`,
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

//SELECT * FROM newMasterSheet JOIN studentMaster JOIN student JOIN markMaster WHERE newMasterSheet.idNewMaster = studentMaster.masterId AND markMaster.studentId = studentMaster.studentId AND student.id = studentMaster.studentId AND newMasterSheet.idNewMaster = ${idNewMaster}
NewMasterSheet.findByMasterId = (idNewMaster, result) => {
   sql.query(
      `SELECT *, (SELECT masterType.typeName FROM masterType WHERE masterType.idMasterType = masterTypeId) As masterTypeName  FROM newmastersheet WHERE idNewMaster = ${idNewMaster}`,
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
               `SELECT idStudentMaster ,studentId , name , email, sex, college_number ,note FROM studentmaster JOIN student WHERE studentmaster.studentId = student.id AND masterId = ${res[0].idNewMaster}`,
               (err, res1) => {
                  if (err) {
                     console.log("error: ", err);
                     result(err, null);
                     return;
                  } else {
                     data.students = res1;
                     sql.query(
                        `SELECT markmaster.studentId , markmaster.lessonId , markmaster.idMarkMaster , markmaster.markType , markmaster.degree , markmaster.status, markmaster.examType FROM markmaster JOIN studentmaster WHERE markmaster.studentId = studentmaster.studentId AND markmaster.masterId = ${res[0].idNewMaster}`,
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
   console.log(newMasterSheet);
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
            result(err, null);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }
         sql.query(
            `DELETE FROM studentMaster WHERE masterId = ${idNewMaster}`,
            (err, resS) => {
               if (err) {
                  result(err, null);
                  console.log(err);
                  return;
               } else {
                  sql.query(
                     `DELETE FROM studentMaster WHERE masterId =${idNewMaster} `,
                     (err, resM) => {
                        if (err) {
                           result(err, null);
                           return;
                        } else {
                           console.log(
                              "deleted newMasterSheet with id: ",
                              idNewMaster
                           );
                           result(null, res);
                        }
                     }
                  );
               }
            }
         );
      }
   );
};

module.exports = NewMasterSheet;
