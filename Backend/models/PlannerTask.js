import mongoose from 'mongoose';

const plannerTaskSchema = new mongoose.Schema(
  {
    user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:        { type: String, required: true, trim: true },
    date:         { type: Date, required: true },
    durationMins: { type: Number, default: 30 },
    category:     { type: String, trim: true },
    done:         { type: Boolean, default: false },
  },
  { timestamps: true }
);

plannerTaskSchema.index({ user: 1, date: 1 });

export default mongoose.model('PlannerTask', plannerTaskSchema);