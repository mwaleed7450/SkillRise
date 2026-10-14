import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema(
  {
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    field:          { type: String, trim: true },           
    goal:           { type: String, trim: true },
    level:          { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    hours:          { type: Number, min: 0, max: 24 },       
    education:      { type: String, trim: true },
    city:           { type: String, trim: true },
    existingSkills: [{ type: String, trim: true }],
    completedSkills:[{ type: String, trim: true }],         
    onboardingDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);