let router = require("express").Router();
const TaskController = require("../controllers/taskController");

router.get("/", function (req, res) {
  res.json({
    status: "API Works",
    message: "Welcome to FirstRest API"
  });
});

router.route("/task").get(TaskController.index).post(TaskController.add);
router
  .route("/task/:task_id")
  .get(TaskController.view)
  .patch(TaskController.update)
  .put(TaskController.update)
  .delete(TaskController.delete);

module.exports = router;
