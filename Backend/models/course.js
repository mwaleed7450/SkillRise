import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category:    { type: String, trim: true },
  level:       { type: String, trim: true },
  duration:    { type: String, trim: true },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', courseSchema);