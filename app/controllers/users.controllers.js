const Users = require("../models/users.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      perv: req.body.perv,
      perv2: req.body.perv2,
   });

   Users.create(user, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the user.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Users.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving users.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Users.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.loginUser = (req, res) => {
   Users.login(req.body.name, req.body.password, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user",
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

   Users.updateById(req.params.id, new Users(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Users.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete user with id " + req.params.id,
            });
         }
      } else res.send({ message: `user was deleted successfully!` });
   });
};
