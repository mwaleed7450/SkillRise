import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    order:       { type: Number, required: true },
    completed:   { type: Boolean, default: false },
    completedAt: Date,
  },
  { _id: true }
);

const roadmapSchema = new mongoose.Schema(
  {
    user:          { type: String, required: true, index: true },
    field:         { type: String, required: true, trim: true },
    title:         { type: String, trim: true },
    steps:         [stepSchema],
    generatedByAI: { type: Boolean, default: true },
  },
  { timestamps: true }
);

roadmapSchema.virtual('progress').get(function () {
  if (!this.steps.length) return 0;
  return Math.round((this.steps.filter(s => s.completed).length / this.steps.length) * 100);
});
roadmapSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);