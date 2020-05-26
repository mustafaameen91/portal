module.exports = (app) => {
   const MasterHistory = require("../controllers/history.controllers.js");

   app.post("/api/addHistory", MasterHistory.create);

   app.get("/api/histories", MasterHistory.findAll);

   app.get("/api/history/:id", MasterHistory.findOne);

   app.post("/api/history/:id", MasterHistory.update);

   app.delete("/api/history/:id", MasterHistory.delete);
};
