import InterviewSession from "../../models/InterviewSession.js";

export const addInterviewSession = async (req, res) => {
  try {
    console.log("Inside the addInterviewSession function");

    let user = String(req.user._id || req.user.id);
    let topic = req.body.topic;
    let level = req.body.level;
    let qa = req.body.qa;
    let overallScore = req.body.overallScore;

    if (!topic) {
      return res.status(400).json({
        message: "Topic Required",
      });
    }

    let session_created = await InterviewSession.create({
      user: user,
      topic: topic,
      level: level,
      qa: qa,
      overallScore: overallScore,
    });

    res.status(200).json({
      message: "Interview Session Created Successfully",
      data: session_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getInterviewSessions = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);

    let sessions = await InterviewSession.find({ user: user }).sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getInterviewSession = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    let session = await InterviewSession.findOne({ _id: id, user: user });

    if (!session) {
      return res.status(404).json({
        message: "Interview Session Not Found",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updateInterviewSession = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);
    let id = req.params.id;
    let qa = req.body.qa;
    let overallScore = req.body.overallScore;

    let session = await InterviewSession.findOne({ _id: id, user: user });

    if (!session) {
      return res.status(404).json({
        message: "Interview Session Not Found",
      });
    }

    if (qa !== undefined) session.qa = qa;
    if (overallScore !== undefined) session.overallScore = overallScore;
    await session.save();

    res.status(200).json({
      message: "Interview Session Updated Successfully",
      data: session,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};