const sql = require("./db.js");

const Student = function (student) {
   this.class = student.class;
};

Student.create = (newStudent, result) => {
   sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created student: ", { id: res.insertId, ...newStudent });
      result(null, { id: res.insertId, ...newStudent });
   });
};

Student.getAll = (startIndex, endIndex, result) => {
   sql.query(
      `SELECT * FROM student LIMIT ${startIndex},${endIndex} `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         // console.log("students: ", res);
         result(null, res);
      }
   );
};

Student.getBySectionId = (startIndex, endIndex, sectionId, result) => {
   sql.query(
      `SELECT * FROM student WHERE sectionid = ${sectionId} LIMIT ${startIndex},${endIndex} `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("students: ", res);
         result(null, res);
      }
   );
};

Student.findById = (studentId, result) => {
   sql.query(`SELECT * FROM student WHERE id = ${studentId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found student: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Student.getBySections = (sqlQuery, result) => {
   sql.query(
      `SELECT student.sectionid , student.name ,student.level , student.college_number, section.name AS sectionName  FROM student JOIN section on student.sectionid = section.id WHERE 1=1 ${sqlQuery} `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found student: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Student.getByStudentName = (studentName, result) => {
   sql.query(
      `SELECT * FROM student WHERE name = "${studentName}"`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Student.getByCollageNumber = (collegeNumber, result) => {
   sql.query(
      `SELECT * FROM student WHERE college_number = "${collegeNumber}"`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Student.getStudentInfo = (startIndex, endIndex, infoQuery, result) => {
   console.log(infoQuery);
   sql.query(
      `SELECT * FROM student WHERE 1=1 ${infoQuery}  ORDER BY status ASC , name ASC LIMIT ${startIndex},${endIndex}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            // console.log("found student: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Student.updateById = (id, className, result) => {
   sql.query(
      "UPDATE student SET class = ? WHERE id = ?",
      [className, id],
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

         console.log("updated student: ", { id: id, ...className });
         result(null, { id: id, ...className });
      }
   );
};

Student.remove = (id, result) => {
   sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted student with id: ", id);
      result(null, res);
   });
};

module.exports = Student;
