import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user:     { type: String, required: true, unique: true },
    fullName: { type: String, trim: true },
    email:    { type: String, trim: true },
    phone:    { type: String, trim: true },
    location: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    github:   { type: String, trim: true },
    summary:  { type: String, trim: true },
    skills:   [{ type: String, trim: true }],
    education: [{ degree: String, institute: String, from: String, to: String, grade: String }],
    experience: [{ role: String, company: String, from: String, to: String, details: String }],
    projects:  [{ title: String, techStack: [String], details: String, link: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema);