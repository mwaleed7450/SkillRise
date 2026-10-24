import ChatMessage from "../../models/ChatMessage.js";

export const addMessage = async (req, res) => {
  try {
    console.log("Inside the addMessage function");

    let user = String(req.user._id || req.user.id);
    let role = req.body.role;
    let content = req.body.content;

    let message_created = await ChatMessage.create({
      user: user,
      role: role,
      content: content,
    });

    res.status(200).json({
      message: "Message Created Successfully",
      data: message_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    let user = String(req.user._id || req.user.id);

    let messages = await ChatMessage.find({ user: user }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};
