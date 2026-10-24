import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
'use strict';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import getTime from './date.js';
import Course from './models/course.js';
import authRoute from "./routes/authRoute/add_authRoute.js";
import profileRoute from "./routes/profileroute/add_profileroute.js";
import projectRoute from "./routes/projectroute/add_projectroute.js";
import roadmapRoute from "./routes/roadmaproute/add_roadmaproute.js";
import chatMessageRoute from "./routes/chatMessageRoute/add_chatMessageRoute.js";
import courseRoute from "./routes/courseRoute/add_courseRoute.js";
import courseProgressRoute from "./routes/courseProgressRoute/add_courseProgressRoute.js";
import interviewSessionRoute from "./routes/interviewSessionRoute/add_interviewSessionRoute.js";
import plannerTaskRoute from "./routes/plannerTaskRoute/add_plannerTaskRoute.js";
import quizAttemptRoute from "./routes/quizAttemptRoute/add_quizAttemptRoute.js";
import resumeRoute from "./routes/resumeRoute/add_resumeRoute.js";
import userRoute from "./routes/userRoute/add_userRoute.js";

dotenv.config();
getTime();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err.message));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/projects", projectRoute);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/chat", chatMessageRoute);
app.use("/api/courses", courseRoute);
app.use("/api/course-progress", courseProgressRoute);
app.use("/api/interview", interviewSessionRoute);
app.use("/api/planner", plannerTaskRoute);
app.use("/api/quiz", quizAttemptRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/user", userRoute);

app.get('/', (req, res) => {
  res.send('SkillRise server is running!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend connected!' });
});


app.get('/api/course', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/course/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Bad id' });
  }
});

app.post('/api/course', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// 'use strict';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import getTime from './date.js';

// dotenv.config();
// getTime();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB error:', err.message));

// const app = express();
// app.use(cors());
// app.use(express.json());


// const Product = mongoose.model('Product', {
//   name: String,
//   price: Number,
//   description: String,
// });

// app.get('/', (req, res) => {
//   res.send('SkillRise server is running!');
// });

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Backend connected!' });
// });


// app.get('/api/products', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });


// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Not found' });
//     }
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: 'Bad id' });
//   }
// });


// app.post('/api/products', async (req, res) => {
//   const product = await Product.create(req.body);
//   res.json(product);
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



