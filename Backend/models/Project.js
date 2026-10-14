import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title:       { type: String, required: true, trim: true },
    description: String,
    techStack:   [{ type: String, trim: true }],
    difficulty:  { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    status:      { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
    githubUrl:   String,
    startedAt:   Date,
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);