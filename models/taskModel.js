var mongoose = require("mongoose");
//schema
var TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  form: {
    type: String,
    required: true
  },
  top: {
    type: Number,
    required: true
  },
  left: {
    type: Number,
    required: true
  },
  linkedTasks: [
    {
      relation: { type: String },
      title: { type: String },
      _id: mongoose.Schema.Types.ObjectId
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});
// Export task Model
var Task = (module.exports = mongoose.model("task", TaskSchema));
module.exports.get = function (callback, limit) {
  Task.find(callback).limit(limit);
};
