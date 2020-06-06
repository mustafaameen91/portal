module.exports = (app) => {
   const Notification = require("../controllers/notifications.controllers.js");

   app.post("/api/addNotification", Notification.create);

   app.get("/api/notifications", Notification.findAll);

   app.get("/api/notification/:id", Notification.findOne);

   app.get("/api/findNotification", Notification.findByQuery);

   app.put("/api/notification/:id", Notification.update);

   app.delete("/api/notification/:id", Notification.delete);
};
