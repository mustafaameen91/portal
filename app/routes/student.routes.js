module.exports = (app) => {
   const Student = require("../controllers/student.controllers.js");

   app.post("/api/addStudent", Student.create);

   app.get("/api/students", Student.findAll);

   app.get("/api/studentSection", Student.findBySectionId);

   app.get("/api/student", Student.findByStudentName);

   app.get("/api/studentCN", Student.findByCollageNumber);

   app.get("/api/studentInfo", Student.findStudentInfo);

   app.get("/api/studentsSection", Student.findBySections);

   app.get("/api/v2/studentInfo", Student.findStudentInfoSignUp);

   app.get("/api/student/:id", Student.findOne);

   app.post("/api/studentClass", Student.update);

   app.delete("/api/student/:id", Student.delete);
};
