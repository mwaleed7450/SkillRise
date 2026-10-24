import CourseProgress from "../../models/CourseProgress.js";

export const addCourseProgress = async (req, res) => {
  try {
    console.log("Inside the addCourseProgress function");

    let user = String(req.user._id || req.user.id);
    let courseTitle = req.body.courseTitle;
    let provider = req.body.provider;
    let url = req.body.url;
    let progress = req.body.progress;

    let courseExist = await CourseProgress.findOne({
      user: user,
      courseTitle: courseTitle,
    });

    if (courseExist) {
      console.log("Course progress already exists");
      return res.status(400).json({
        message: "Course Already Added",
      });
    }

    let progress_created = await CourseProgress.create({
      user: user,
      courseTitle: courseTitle,
      provider: provider,
      url: url,
      progress: progress,
    });

    res.status(200).json({
      message: "Course Progress Created Successfully",
      data: progress_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);

    let courses = await CourseProgress.find({ user: user }).sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updateCourseProgress = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);
    let id = req.params.id;
    let progress = req.body.progress;

    let course = await CourseProgress.findOne({ _id: id, user: user });

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    course.progress = progress;
    await course.save();

    res.status(200).json({
      message: "Course Progress Updated Successfully",
      data: course,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};