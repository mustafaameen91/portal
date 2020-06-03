const sql = require("./db.js");

const Notifications = function (notification) {
   this.body = notification.body;
   this.userId = notification.userId;
   this.date = notification.date;
};

Notifications.create = (newNotification, result) => {
   sql.query("INSERT INTO notifications SET ?", newNotification, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created  notification: ", {
         notifId: res.insertId,
         ...newNotification,
      });
      result(null, { notiId: res.insertId, ...newNotification });
   });
};

Notifications.getAll = (result) => {
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

Notifications.getQuery = (sqlQuery, result) => {
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

Notifications.findById = (userId, result) => {
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

Notifications.updateById = (id, user, result) => {
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

Notifications.remove = (id, result) => {
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

module.exports = Notifications;
