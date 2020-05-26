const sql = require("./db.js");

const Teacher = function (teacher) {
   this.name = teacher.name;
   this.sex = teacher.sex;
   this.birthdate = teacher.birthdate;
   this.type = teacher.type;
   this.lessons = teacher.lessons;
   this.salary = teacher.salary;
   this.type2 = teacher.type2;
   this.email = teacher.email;
   this.password = teacher.password;
   this.phone = teacher.phone;
   this.relationship = teacher.relationship;
   this.region = teacher.region;
   this.sectionId = teacher.sectionId;
   this.status = teacher.status;
};

Teacher.create = (newTeacher, result) => {
   sql.query("INSERT INTO teacher SET ?", newTeacher, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created teacher: ", { id: res.insertId, ...newTeacher });
      result(null, { id: res.insertId, ...newTeacher });
   });
};

Teacher.getAll = (sqlQuery, result) => {
   console.log(sqlQuery);
   sql.query(
      `SELECT * FROM teacher WHERE 1=1 ${sqlQuery} LIMIT 30`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("teacher: ", res);
         result(null, res);
      }
   );
};

Teacher.loginTeacher = (email, password, result) => {
   sql.query(
      `SELECT * FROM teacher WHERE email = '${email}' AND password = '${password}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("teacher: ", res);
         result(null, res[0]);
      }
   );
};

Teacher.findById = (teacherId, result) => {
   sql.query(`SELECT * FROM teacher WHERE id = ${teacherId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found teacher: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Teacher.updateById = (id, teacher, result) => {
   sql.query("UPDATE teacher SET ? WHERE id = ?", [teacher, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated teacher: ", { id: id, ...teacher });
      result(null, { id: id, ...teacher });
   });
};

Teacher.remove = (id, result) => {
   sql.query("DELETE FROM teacher WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted teacher with id: ", id);
      result(null, res);
   });
};

module.exports = Teacher;
