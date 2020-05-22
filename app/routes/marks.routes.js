module.exports = (app) => {
   const Marks = require("../controllers/marks.controllers.js");

   app.post("/api/addMark", Marks.create);

   app.post("/api/addLift", Marks.updateLift);

   app.post("/api/updateStatus", Marks.updateStatusData);

   app.get("/api/marks", Marks.findAll);

   app.get("/api/marksLift", Marks.findLiftDegree);
};
