const sql = require("./db.js");

const SectionOrder = function (sectionOrder) {
   this.studentId = sectionOrder.studentId;
   this.sectionId = sectionOrder.sectionId;
   this.content = sectionOrder.content;
   this.level = sectionOrder.level;
   this.class = sectionOrder.class;
   this.year = sectionOrder.year;
   this.orderNo = sectionOrder.orderNo;
   this.date = sectionOrder.date;
};

SectionOrder.create = (newSectionOrder, result) => {
   sql.query("INSERT INTO sectionorder SET ?", newSectionOrder, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created  sectionOrder: ", {
         idSectionOrder: res.insertId,
         ...newSectionOrder,
      });
      result(null, { idSectionOrder: res.insertId, ...newSectionOrder });
   });
};

SectionOrder.getAll = (result) => {
   sql.query("SELECT * FROM sectionorder", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("sectionOrder: ", res);
      result(null, res);
   });
};

SectionOrder.findById = (sectionOrderId, result) => {
   sql.query(
      `SELECT * FROM sectionorder WHERE id = ${sectionOrderId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found sectionOrder: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SectionOrder.getByQuery = (sqlQuery, result) => {
   sql.query(
      `SELECT * FROM sectionorder WHERE 1=1 ${sqlQuery} `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found sectionOrder: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SectionOrder.updateById = (sectionOrderId, sectionOrder, result) => {
   sql.query(
      "UPDATE sectionorder SET ? WHERE id = ?",
      [sectionOrder, sectionOrderId],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated sectionOrder: ", { id: id, ...sectionOrder });
         result(null, { idSectionOrder: sectionOrderId, ...sectionOrder });
      }
   );
};

SectionOrder.remove = (sectionOrderId, result) => {
   sql.query(
      "DELETE FROM sectionorder WHERE id = ?",
      sectionOrderId,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted sectionOrder with id: ", sectionOrderId);
         result(null, res);
      }
   );
};

module.exports = SectionOrder;
