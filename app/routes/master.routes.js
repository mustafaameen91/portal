module.exports = (app) => {
   const MasterSheet = require("../controllers/master.controllers.js");

   app.post("/api/addMaster", MasterSheet.create);

   app.get("/api/masters", MasterSheet.findAll);

   app.get("/api/master/:id", MasterSheet.findOne);

   app.post("/api/master/:id", MasterSheet.update);

   app.delete("/api/master/:id", MasterSheet.delete);
};
