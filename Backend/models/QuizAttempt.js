import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    question:      { type: String, required: true },
    options:       [String],
    correctIndex:  { type: Number, required: true },
    selectedIndex: { type: Number, default: null },
  },
  { _id: false }
);


const quizAttemptSchema = new mongoose.Schema(
  {
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    topic:      { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    answers:    [answerSchema],
    score:      { type: Number, default: 0 },
    total:      { type: Number, default: 0 },
    xpEarned:   { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.model('QuizAttempt', quizAttemptSchema);