const SectionOrder = require("../models/sectionOrder.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const sectionOrder = new SectionOrder({
      studentId: req.body.studentId,
      sectionId: req.body.sectionId,
      content: req.body.content,
      level: req.body.level,
      class: req.body.class,
      year: req.body.year,
      orderNo: req.body.orderNo,
      date: req.body.date,
   });

   SectionOrder.create(sectionOrder, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the SectionOrder.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   SectionOrder.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving sectionOrder.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SectionOrder.findById(req.params.idSectionOrder, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found sectionOrder with id ${req.params.idSectionOrder}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving sectionOrder with id " +
                  req.params.idSectionOrder,
            });
         }
      } else res.send(data);
   });
};

exports.findByQuery = (req, res) => {
   let studentId = req.params.studentId;
   let level = req.params.level;
   let year = req.params.year;

   let sqlQuery = "";

   if (studentId) {
      sqlQuery += `AND studentId = '${studentId}' `;
   }

   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }

   if (year) {
      sqlQuery += `AND year = '${year}' `;
   }

   SectionOrder.getByQuery(sqlQuery, (err, data) => {
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

   SectionOrder.updateById(
      req.params.idSectionOrder,
      new SectionOrder(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found sectionOrder with id ${req.params.idSectionOrder}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating sectionOrder with id " +
                     req.params.idSectionOrder,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SectionOrder.remove(req.params.idSectionOrder, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found sectionOrder with id ${req.params.idSectionOrder}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete sectionOrder with id " +
                  req.params.idSectionOrder,
            });
         }
      } else res.send({ message: `sectionOrder was deleted successfully!` });
   });
};
