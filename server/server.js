/* eslint-env node */
const client = require("./db");

module.exports = app => {
  app.get("/api", (_, res) => {
    res.send({ message: "Hello from API" });
  });
  app.get("/api/expenses", (req, res) => {
    client.connect();
    client
      .query("SELECT * FROM expenses")
      .then(query => {
        res.send(query.rows);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  });

  app.post("/api/expenses", (req, res) => {
    client.connect();
    const insertQuery =
      "INSERT INTO expenses(name,fee,periodicity) values($1,$2,$3) RETURNING *";
    const { body } = req;
    const values = [body.name, body.fee, body.periodicity];
    client
      .query(insertQuery, values)
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  });

  app.patch("/api/expenses/:id", (req, res) => {
    client.connect();
    const updateQuery =
      "UPDATE expenses SET name = $1, fee = $2, periodicity = $3 WHERE id = $4 RETURNING *";
    const { body } = req;
    const values = [body.name, body.fee, body.periodicity, req.params.id];
    client
      .query(updateQuery, values)
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  });

  app.delete("/api/expenses/:id", (req, res) => {
    client.connect();
    const deleteQuery = "DELETE FROM expenses WHERE id = $1";
    client
      .query(deleteQuery, [req.params.id])
      .then(() => {
        res.status(200).send({ message: "Deleted" });
      })
      .catch(err => {
        console.log("Error:", err);
      });
  });
};
