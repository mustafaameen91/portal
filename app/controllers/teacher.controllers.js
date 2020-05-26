const Teacher = require("../models/teacher.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const teacher = new Teacher({
      name: req.body.name,
      sex: req.body.sex,
      birthdate: req.body.birthdate,
      type: req.body.type,
      lessons: req.body.lessons,
      salary: req.body.salary,
      type2: req.body.type2,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      relationship: req.body.relationship,
      region: req.body.region,
      sectionId: req.body.sectionId,
      status: req.body.status,
   });

   Teacher.create(teacher, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the teacher.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   let sectionId = req.query.sectionId;
   let teacherName = req.query.name;

   let sqlQuery = "";

   if (sectionId) {
      sqlQuery += `AND sectionId = '${sectionId}' `;
   }
   if (teacherName) {
      sqlQuery += `AND name LIKE '${teacherName}%' `;
   }

   Teacher.getAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving teacher.",
         });
      else res.send(data);
   });
};

exports.teacherLogin = (req, res) => {
   let email = req.body.email;
   let password = req.body.password;

   Teacher.loginTeacher(email, password, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving teacher.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Teacher.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found teacher with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving teacher with id " + req.params.id,
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

   Teacher.updateById(req.params.id, new Teacher(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found teacher with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating teacher with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Teacher.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found teacher with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete teacher with id " + req.params.id,
            });
         }
      } else res.send({ message: `teacher was deleted successfully!` });
   });
};
