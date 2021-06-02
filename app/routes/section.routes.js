module.exports = (app) => {
   const Section = require("../controllers/section.controllers.js");

   app.post("/api/addSection", Section.create);

   app.get("/api/sections", Section.findAll);

   app.get("/api/section/:id", Section.findOne);

   app.put("/api/section/:id", Section.update);

   app.delete("/api/section/:id", Section.delete);
};
