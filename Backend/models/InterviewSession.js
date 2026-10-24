import mongoose from 'mongoose';

const qaSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer:   String,
    feedback: String,
    score:    { type: Number, min: 0, max: 10 },
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    user:         { type: String, required: true, index: true },
    topic:        { type: String, required: true, trim: true },
    level:        { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    qa:           [qaSchema],
    overallScore: { type: Number, min: 0, max: 10 },
  },
  { timestamps: true }
);

export default mongoose.models.InterviewSession || mongoose.model('InterviewSession', interviewSessionSchema);