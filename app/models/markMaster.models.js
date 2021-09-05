const sql = require("./db.js");

const MarkMaster = function (markMaster) {
   this.studentId = markMaster.studentId;
   this.lessonId = markMaster.lessonId;
   this.masterId = markMaster.masterId;
   this.markType = markMaster.markType;
   this.degree = markMaster.degree;
   this.examType = markMaster.examType;
   this.status = markMaster.status;
};

MarkMaster.create = (newMarkMaster, result) => {
   sql.query("INSERT INTO markmaster SET ?", newMarkMaster, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created markMaster: ", {
         id: res.insertId,
         ...newMarkMaster,
      });
      result(null, { id: res.insertId, ...newMarkMaster });
   });
};

MarkMaster.getAll = (result) => {
   sql.query("SELECT * FROM markmaster", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("markMasters: ", res);
      result(null, res);
   });
};

MarkMaster.checkDegree = (data, result) => {
   sql.query(
      `SELECT * FROM markmaster Where studentId = ${data.studentId} AND lessonId = ${data.lessonId} AND markType = '${data.markType}' AND masterId = ${data.masterId}`,
      (err, row) => {
         if (row.length == 0) {
            console.log("not found");
            result("not found", null);
            return;
         } else {
            result(null, row);
         }
      }
   );
};

// MarkMaster.getAllForAverages = (level, sectionId, result) => {
//    sql.query(
//       `SELECT SUM(markmaster.degree * lesson.credit)  average  , student.college_number FROM markmaster JOIN newmastersheet JOIN lesson JOIN student ON markmaster.masterId = newmastersheet.idNewMaster AND markmaster.lessonId = lesson.id AND markmaster.studentId = student.id WHERE newmastersheet.sectionId = ${sectionId} AND newmastersheet.level = ${level} GROUP BY student.college_number`,
//       (err, res) => {
//          if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//          }
//          console.log("mark Masters: ", res);
//          result(null, res);
//       }
//    );
// };

MarkMaster.getStudentAllMarks = (level, sectionId, collegeNumber, result) => {
   sql.query(
      `SELECT student.college_number , markmaster.degree , markmaster.studentId ,lesson.course, markmaster.status ,markmaster.idMarkMaster, markmaster.examType, lesson.id AS lessonId ,lesson.enName ,  markmaster.markType , lesson.credit FROM markmaster JOIN newmastersheet JOIN lesson JOIN student ON markmaster.masterId = newmastersheet.idNewMaster AND markmaster.lessonId = lesson.id AND markmaster.studentId = student.id WHERE newmastersheet.sectionId = ${sectionId} AND newmastersheet.level = ${level}   AND student.college_number LIKE '%${collegeNumber}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }
         console.log("mark Masters: ", res);
         result(null, res);
      }
   );
};

MarkMaster.getAllForAverages = (level, sectionId, year, result) => {
   sql.query(
      `SELECT student.college_number , markmaster.degree , lesson.id AS lessonId ,lesson.enName ,  markmaster.markType , lesson.credit FROM newmastersheet JOIN markmaster JOIN lesson JOIN student ON markmaster.masterId = newmastersheet.idNewMaster AND markmaster.lessonId = lesson.id AND markmaster.studentId = student.id WHERE newmastersheet.sectionId = ${sectionId} AND newmastersheet.level = ${level} AND newmastersheet.year = '${year}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }
         // console.log("mark Masters: ", res);
         result(null, res);
      }
   );
};

MarkMaster.getAllForAverageClass = (level, sectionId, className, result) => {
   sql.query(
      `SELECT student.college_number , markmaster.degree , markmaster.studentId , markmaster.status ,markmaster.idMarkMaster, markmaster.examType, lesson.id AS lessonId ,lesson.enName ,  markmaster.markType , lesson.credit FROM markmaster JOIN newmastersheet JOIN lesson JOIN student ON markmaster.masterId = newmastersheet.idNewMaster AND markmaster.lessonId = lesson.id AND markmaster.studentId = student.id WHERE newmastersheet.sectionId = ${sectionId} AND newmastersheet.level = ${level} AND newmastersheet.class = '${className}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }
         console.log("mark Masters: ", res);
         result(null, res);
      }
   );
};

MarkMaster.getStudentForAverage = (level, sectionId, collageNumber, result) => {
   console.log(collageNumber);
   sql.query(
      `SELECT SUM(markmaster.degree * lesson.credit)  average  , student.college_number FROM markmaster JOIN newmastersheet JOIN lesson JOIN student ON markmaster.masterId = newmastersheet.idNewMaster AND markmaster.lessonId = lesson.id AND markmaster.studentId = student.id WHERE newmastersheet.sectionId = ${sectionId} AND newmastersheet.level = ${level} AND student.college_number LIKE '%${collageNumber}' GROUP BY student.college_number`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }
         console.log("mark Masters: ", res);
         result(null, res);
      }
   );
};

MarkMaster.getQuery = (sqlQuery, result) => {
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

MarkMaster.getSummerTraining = (studentId, result) => {
   sql.query(
      `SELECT * FROM markmaster JOIN lesson ON lesson.id = markmaster.lessonId WHERE lesson.name LIKE '%التدريب الصيفي%' AND markmaster.studentId = ${studentId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("markMasters: ", res);
         result(null, res);
      }
   );
};

MarkMaster.findById = (markMasterId, result) => {
   sql.query(
      `SELECT * FROM markmaster WHERE id = ${markMasterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found markMaster: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MarkMaster.updateById = (idMarkMaster, markMaster, result) => {
   sql.query(
      "UPDATE markmaster SET ? WHERE idMarkMaster = ?",
      [markMaster, idMarkMaster],
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

         console.log("updated markMaster: ", {
            id: idMarkMaster,
            ...markMaster,
         });
         result(null, { id: idMarkMaster, ...markMaster });
      }
   );
};

MarkMaster.remove = (idMarkMaster, result) => {
   sql.query(
      "DELETE FROM markmaster WHERE idMarkMaster = ?",
      idMarkMaster,
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

         console.log("deleted markMaster with id: ", idMarkMaster);
         result(null, res);
      }
   );
};

module.exports = MarkMaster;
