const MasterSheet = require("../models/master.models.js");
const md5 = require("md5");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   let masterKeyB64 = md5(req.body.masterKey);

   MasterSheet.checkKey(masterKeyB64, (err, data) => {
      if (data.length > 0) {
         res.send(data[0]);
      } else {
         masterSheetData = {
            masterKey: masterKeyB64,
            note: req.body.note,
         };

         MasterSheet.create(masterSheetData, (err, data) => {
            if (err)
               res.status(500).send({
                  message: "Some error occurred while creating the user.",
               });
            else res.send(data);
         });
      }
   });
};

exports.findAll = (req, res) => {
   MasterSheet.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving users.",
         });
      else res.send(data[0]);
   });
};

exports.findOne = (req, res) => {
   MasterSheet.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving masterSheet with id " + req.params.id,
            });
         }
      } else res.send(data[0]);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   MasterSheet.updateById(req.params.id, req.body.note, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating masterSheet with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   MasterSheet.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete masterSheet with id " + req.params.id,
            });
         }
      } else res.send({ message: `masterSheet was deleted successfully!` });
   });
};
