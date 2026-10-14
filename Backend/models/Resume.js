import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: String,
    email:    String,
    phone:    String,
    location: String,
    linkedin: String,
    github:   String,
    summary:  String,
    skills:   [String],
    education: [{ degree: String, institute: String, from: String, to: String, grade: String }],
    experience:[{ role: String, company: String, from: String, to: String, details: String }],
    projects:  [{ title: String, techStack: [String], details: String, link: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);