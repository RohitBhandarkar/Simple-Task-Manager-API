const express = require("express");
const app = express(); //initialze the app
const tasks = require("./routes/tasks");
const { connectDB } = require("./db/connect");
require("dotenv").config();

//middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

//app.get('/api/v1/tasks')        - get all tasks
//app.get('/api/v1/tasks/:id')    - get single task
//app.post('/api/v1/tasks)        - create a new task
//app.patch('/api/v1/tasks/:id')  - update task
//app.delete('/api/v1/tasks/:id') - delete task

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.uri);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
