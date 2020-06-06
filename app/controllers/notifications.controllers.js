const Notifications = require("../models/notifications.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const notifications = new Notifications({
      body: req.body.body,
      userId: req.body.userId,
      date: req.body.date,
      title: req.body.title,
      roleId: req.body.roleId,
   });

   Notifications.create(notifications, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the notification.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Notifications.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving notifications.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Notifications.findById(req.params.notiId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found notification with id ${req.params.notiId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving notification with id " + req.params.notiId,
            });
         }
      } else res.send(data);
   });
};

exports.findByQuery = (req, res) => {
   let roleId = req.params.roleId;
   let userId = req.params.userId;

   let sqlQuery = "";

   if (roleId) {
      sqlQuery += `AND roleId = '${roleId}' `;
   }

   if (userId) {
      sqlQuery += `AND userId = '${userId}' `;
   }

   Notifications.getByQuery(sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found sectionOrder.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving sectionOrder ",
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Notifications.updateById(
      req.params.notiId,
      new Notifications(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found notification with id ${req.params.notiId}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating notification with id " + req.params.notiId,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   Notifications.remove(req.params.notiId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found notification with id ${req.params.notiId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete notification with id " + req.params.notiId,
            });
         }
      } else res.send({ message: `notification was deleted successfully!` });
   });
};
