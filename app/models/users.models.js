const sql = require("./db.js");

const Users = function (users) {
   this.name = users.name;
   this.email = users.email;
   this.password = users.password;
   this.perv = users.perv;
   this.prev2 = users.prev2;
};

Users.create = (newUser, result) => {
   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
   });
};

Users.getAll = (result) => {
   sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("users: ", res);
      result(null, res);
   });
};

Users.findById = (userId, result) => {
   sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
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
   });
};

Users.updateById = (id, user, result) => {
   sql.query("UPDATE user SET ? WHERE id = ?", [user, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
   });
};

Users.login = (userName, password, result) => {
   sql.query(
      `SELECT user.name , user.id , user.perv , user.prev2 , (SELECT name  FROM section WHERE id = user.perv) AS sectionName,(SELECT type  FROM section WHERE id = user.perv) AS course,(SELECT val FROM \`system\` WHERE var = \'currentYear\') AS currentYear , 'ok' AS message FROM user WHERE name = "${userName}" AND password = "${password}"`,
      (err, res) => {
         if (err) {
            result(null, err);
            return;
         }

         if (res.length == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         if (res[0].perv == "-1") {
            let data = {
               id: res[0].id,
               name: res[0].name,
               perv: res[0].perv,
               prev2: res[0].prev2,
               sectionName: "all",
               currentYear: res[0].currentYear,
               message: res[0].message,
            };
            result(null, data);
         } else if (res[0].perv == "0") {
            let data = {
               id: res[0].id,
               name: res[0].name,
               perv: res[0].perv,
               prev2: res[0].prev2,
               sectionName: "readOnly",
               currentYear: res[0].currentYear,
               message: res[0].message,
            };
            result(null, data);
         } else result(null, res[0]);
      }
   );
};

Users.remove = (id, result) => {
   sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
   });
};

module.exports = Users;
