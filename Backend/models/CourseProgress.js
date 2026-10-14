import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseTitle: { type: String, required: true, trim: true },
    provider:    String,
    url:         String,
    progress:    { type: Number, min: 0, max: 100, default: 0 },
    completedAt: Date,
  },
  { timestamps: true }
);

courseProgressSchema.index({ user: 1, courseTitle: 1 }, { unique: true });

courseProgressSchema.pre('save', function () {
  if (this.progress >= 100 && !this.completedAt) this.completedAt = new Date();
});

export default mongoose.model('CourseProgress', courseProgressSchema);