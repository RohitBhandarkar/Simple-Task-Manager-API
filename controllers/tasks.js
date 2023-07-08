const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const found = await Task.find({});
    res.status(200).json(found);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(
      { _id: taskID },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task: null, stauts: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task: task, status: "success" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
