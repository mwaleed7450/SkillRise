import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  try {
    console.log("Inside the signupUser function");

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fields Required",
      });
    }

    let userExist = await User.findOne({ email: email.toLowerCase() });

    if (userExist) {
      console.log("User already exists");
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    let user_created = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user_created._id,
        name: user_created.name,
        email: user_created.email,
      },
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Inside the loginUser function");

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password Required",
      });
    }

    let user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    console.log("Inside the getMe function");

    let id = String(req.user._id || req.user.id);

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Fetched Successfully",
      user: user,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};