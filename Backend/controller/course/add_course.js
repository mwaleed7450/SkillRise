import mongoose from "mongoose";
import Course from "../../models/course.js";

export const addCourse = async (req, res) => {
  try {
    console.log("Inside the addCourse function");

    let title = req.body.title;
    let description = req.body.description;
    let category = req.body.category;
    let level = req.body.level;
    let duration = req.body.duration;

    if (!title) {
      return res.status(400).json({ message: "Title Required" });
    }

    let course_created = await Course.create({
      title: title,
      description: description,
      category: category,
      level: level,
      duration: duration,
    });

    res.status(200).json({
      message: "Course Created Successfully",
      course: course_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    console.log("Inside the getCourses function");

    let courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Courses Fetched Successfully",
      courses: courses,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    console.log("Inside the getCourse function");

    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    let course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    res.status(200).json({
      message: "Course Fetched Successfully",
      course: course,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    console.log("Inside the updateCourse function");

    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    let course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    if (req.body.title !== undefined) course.title = req.body.title;
    if (req.body.description !== undefined) course.description = req.body.description;
    if (req.body.category !== undefined) course.category = req.body.category;
    if (req.body.level !== undefined) course.level = req.body.level;
    if (req.body.duration !== undefined) course.duration = req.body.duration;

    await course.save();

    res.status(200).json({
      message: "Course Updated Successfully",
      course: course,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    console.log("Inside the deleteCourse function");

    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    let course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    res.status(200).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};
