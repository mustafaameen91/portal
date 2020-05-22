module.exports = (app) => {
   const Level = require("../controllers/level.controllers.js");

   app.post("/api/addLevel", Level.create);

   app.get("/api/levels", Level.findAll);

   app.get("/api/level/:id", Level.findOne);

   app.put("/api/level/:id", Level.update);

   app.delete("/api/level/:id", Level.delete);
};
