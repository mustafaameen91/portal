module.exports = (app) => {
   const StudentMaster = require("../controllers/studentMaster.controllers.js");

   app.post("/api/v2/addStudentMaster", StudentMaster.create);

   app.post("/api/v2/addMultiStudent", StudentMaster.createMultiStudents);

   app.get("/api/v2/studentMasters", StudentMaster.findAll);

   app.get("/api/v2/getByQuery", StudentMaster.findQuery);

   app.get("/api/v2/studentMaster/:id", StudentMaster.findOne);

   app.post("/api/v2/studentMaster/:id", StudentMaster.update);

   app.delete("/api/v2/studentMaster/:id", StudentMaster.delete);
};
