let Task = require("../models/taskModel");

let TaskController = {
  //index
  index: async (req, res) => {
    await Task.get(function (err, task) {
      if (err) {
        res.status(404).json({
          status: "error",
          message: err
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Got Tasks Successfully!",
        data: task
      });
    });
  },
  //create a new task
  add: async (req, res) => {
    var task = new Task();
    task.title = req.body.title ? req.body.title : task.title;
    task.icon = req.body.icon;
    task.color = req.body.color;
    task.form = req.body.form;
    task.top = req.body.top;
    task.left = req.body.left;
    task.linkedTasks = req.body.linkedTasks;
    //Save and check error
    await task.save(function (err) {
      if (err) {
        res.status(404).json({
          status: "error",
          message: err
        });
        return;
      }
      res.status(200).json({
        message: "New Task Added!",
        data: task
      });
    });
  },
  // View Task
  view: async (req, res) => {
    await Task.findById(req.params.task_id, function (err, task) {
      if (err) {
        res.status(404).json({
          status: "error",
          message: err
        });
        return;
      }
      res.status(200).json({
        message: "Task Details",
        data: task
      });
    });
  },
  // Update Task
  update: async (req, res) => {
    await Task.findById(req.params.task_id, function (err, task) {
      if (err) {
        res.status(404).json({
          status: "error",
          message: err
        });
        return;
      }
      task.title = req.body.title ? req.body.title : task.title;
      task.icon = req.body.icon;
      task.color = req.body.color;
      task.form = req.body.form;
      task.top = req.body.top;
      task.left = req.body.left;
      task.linkedTasks = req.body.linkedTasks;
      //save and check errors
      task.save(function (err) {
        if (err) {
          res.status(404).json({
            status: "error",
            message: err
          });
          return;
        }
        res.status(200).json({
          message: "Task Updated Successfully",
          data: { task }
        });
      });
    });
  },
  // Delete Task
  delete: async (req, res) => {
    const result = await Task.find({
      linkedTasks: { $elemMatch: { _id: req.params.task_id } }
    }).exec();

    result.forEach(task => {
      task.linkedTasks = task.linkedTasks.filter(function (value) {
        return value._id != req.params.task_id;
      });
      task.save();
    });

    await Task.deleteOne(
      {
        _id: req.params.task_id
      },
      function (err, tsk) {
        if (err) {
          res.status(404).json({
            status: "error",
            message: err
          });
          return;
        }

        res.status(200).json({
          status: "success",
          message: "Task Deleted"
        });
      }
    );
  }
};

module.exports = TaskController;
