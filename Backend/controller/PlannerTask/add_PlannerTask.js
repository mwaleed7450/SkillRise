import PlannerTask from "../../models/PlannerTask.js";

export const addPlannerTask = async (req, res) => {
  try {
    console.log("Inside the addPlannerTask function");

    let user = String(req.user._id || req.user.id);
    let title = req.body.title;
    let date = req.body.date;
    let durationMins = req.body.durationMins;
    let category = req.body.category;

    if (!title || !date) {
      return res.status(400).json({
        message: "Title and Date Required",
      });
    }

    let task_created = await PlannerTask.create({
      user: user,
      title: title,
      date: date,
      durationMins: durationMins,
      category: category,
    });

    res.status(200).json({
      message: "Planner Task Created Successfully",
      data: task_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getPlannerTasks = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);

    let tasks = await PlannerTask.find({ user: user }).sort({ date: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updatePlannerTask = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    let task = await PlannerTask.findOne({ _id: id, user: user });

    if (!task) {
      return res.status(404).json({
        message: "Planner Task Not Found",
      });
    }

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.date !== undefined) task.date = req.body.date;
    if (req.body.durationMins !== undefined) task.durationMins = req.body.durationMins;
    if (req.body.category !== undefined) task.category = req.body.category;
    if (req.body.done !== undefined) task.done = req.body.done;
    await task.save();

    res.status(200).json({
      message: "Planner Task Updated Successfully",
      data: task,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const deletePlannerTask = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    let task = await PlannerTask.findOneAndDelete({ _id: id, user: user });

    if (!task) {
      return res.status(404).json({
        message: "Planner Task Not Found",
      });
    }

    res.status(200).json({
      message: "Planner Task Deleted Successfully",
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};