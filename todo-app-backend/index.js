const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database("./todo.db");

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get("/tasks", (req, res) => {
  const getAllTask = `
    SELECT 
    * 
    FROM 
    tasks
    `;
  db.all(getAllTask, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } else {
      res.json(rows);
    }
  });
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  const queryPost = `
    INSERT INTO tasks(task)
    VALUES ("${task}")
    `;
  db.run(queryPost, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } else {
      res.json({ task });
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = `
    DELETE 
    FROM 
    tasks 
    WHERE id = ${id}
    `;
  db.run(deleteQuery, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } else {
      res.json({ id });
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const queryUpdate = `
    UPDATE 
    tasks
    SET 
    completed = ${1}
    WHERE 
    id= ${id}
    `;
  db.run(queryUpdate, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } else {
      res.json({ id });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
