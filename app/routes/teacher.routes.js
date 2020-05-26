module.exports = (app) => {
   const Teacher = require("../controllers/teacher.controllers.js");

   app.post("/api/addTeacher", Teacher.create);

   app.post("/api/loginTeacher", Teacher.teacherLogin);

   app.get("/api/teachers", Teacher.findAll);

   app.get("/api/teacher/:id", Teacher.findOne);

   app.post("/api/teacher/:id", Teacher.update);

   app.delete("/api/teacher/:id", Teacher.delete);
};
