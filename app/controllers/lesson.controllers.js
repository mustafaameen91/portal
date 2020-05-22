const Lesson = require("../models/lessons.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const lesson = new Lesson({
      name: req.body.name,
      sectionid: req.body.sectionid,
      teacherid: req.body.teacherid,
      credit: req.body.credit,
      required: req.body.required,
      mgroupid: req.body.mgroupid,
      prevlesson: req.body.prevlesson,
      year: req.body.year,
      theoretical: req.body.theoretical,
      practical: req.body.practical,
      final: req.body.final,
      enName: req.body.enName,
      level: req.body.level,
      thHoure: req.body.thHoure,
      prHoure: req.body.prHoure,
      course: req.body.course,
   });

   Lesson.create(lesson, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the lesson.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   let id = req.query.id;
   let sectionId = req.query.sectionId;
   let teacherId = req.query.teacherId;
   let year = req.query.year;
   let level = req.query.level;
   let course = req.query.course;

   let sqlQuery = "";

   if (id) {
      sqlQuery += `AND id = '${id}' `;
   }
   if (sectionId) {
      sqlQuery += `AND sectionid = '${sectionId}' `;
   }
   if (teacherId) {
      sqlQuery += `AND teacherid = '${teacherId}' `;
   }
   if (year) {
      sqlQuery += `AND year = '${year}' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}'`;
   }
   if (course) {
      sqlQuery += `AND course = '${course}'`;
   }

   Lesson.getAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Lesson.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving class with id " + req.params.id,
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

   Lesson.updateById(req.params.id, new Lesson(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating lesson with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Lesson.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete lesson with id " + req.params.id,
            });
         }
      } else res.send({ message: `lesson was deleted successfully!` });
   });
};
