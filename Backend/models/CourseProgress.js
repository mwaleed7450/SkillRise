import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    user:        { type: String, required: true },
    courseTitle: { type: String, required: true, trim: true },
    provider:    { type: String, trim: true },
    url:         { type: String, trim: true },
    progress:    { type: Number, min: 0, max: 100, default: 0 },
    completedAt: Date,
  },
  { timestamps: true }
);

courseProgressSchema.index({ user: 1, courseTitle: 1 }, { unique: true });

courseProgressSchema.pre('save', function () {
  if (this.progress >= 100 && !this.completedAt) this.completedAt = new Date();
});

export default mongoose.models.CourseProgress || mongoose.model('CourseProgress', courseProgressSchema);