import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user:        { type: String, required: true, index: true },
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    techStack:   [{ type: String, trim: true }],
    difficulty:  { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    status:      { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
    githubUrl:   { type: String, trim: true },
    startedAt:   Date,
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', projectSchema);