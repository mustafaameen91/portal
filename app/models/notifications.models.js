const sql = require("./db.js");

const Notifications = function (notification) {
   this.body = notification.body;
   this.userId = notification.userId;
   this.date = notification.date;
   this.title = notification.title;
   this.roleId = notification.roleId;
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
   sql.query("SELECT * FROM notifications", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("notifications: ", res);
      result(null, res);
   });
};

Notifications.findById = (notificationId, result) => {
   sql.query(
      `SELECT * FROM notifications WHERE id = ${notificationId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found notification: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Notifications.getByQuery = (sqlQuery, result) => {
   sql.query(
      `SELECT * FROM notifications WHERE 1=1 ${sqlQuery} `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found notifications: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Notifications.updateById = (notificationId, notification, result) => {
   sql.query(
      "UPDATE notifications SET ? WHERE id = ?",
      [notification, notificationId],
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

         console.log("updated notification: ", {
            id: notificationId,
            ...notification,
         });
         result(null, { id: notificationId, ...notification });
      }
   );
};

Notifications.remove = (notificationId, result) => {
   sql.query(
      "DELETE FROM notifications WHERE id = ?",
      notificationId,
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

         console.log("deleted notification with id: ", notificationId);
         result(null, res);
      }
   );
};

module.exports = Notifications;
