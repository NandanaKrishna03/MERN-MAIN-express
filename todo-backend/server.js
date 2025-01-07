const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');



require('dotenv').config();
app.use(cors(
  {
    origin:[],
    method:["POST","GET","POST","DELETE"],
    credentials:true
  }
  ));

app.use(express.json());
mongoose.connect(`mongodb+srv://nandanakrishna75:${dbPassword}@main.4ibgw.mongodb.net/?retryWrites=true&w=majority&appName=main`)
let tasks = [];

app.get('/', (req, res) => {
    res.json(tasks);
});

app.post('/', (req, res) => {
    const task = req.body.task;
    tasks.push({
        _id: uuidv4(),
        task: task,
    });
    res.json("success");
});

app.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.send("Task deleted successfully");
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;
    const taskIndex = tasks.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].task = updatedTask;
        res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});



app.listen(3001,()=>{
  console.log("server is running")
});