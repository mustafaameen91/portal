module.exports = (app) => {
   const lesson = require("../controllers/lesson.controllers.js");

   app.post("/api/addLesson", lesson.create);

   app.get("/api/lessons", lesson.findAll);

   app.get("/api/findAverageLessons", lesson.findAverageLessons);

   app.get("/api/sectionLessonsForDocument", lesson.findLessonsForSection);

   app.get("/api/lesson/:id", lesson.findOne);

   app.post("/api/lesson/:id", lesson.update);

   app.delete("/api/lesson/:id", lesson.delete);
};
