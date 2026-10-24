import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    user:    { type: String, required: true },
    role:    { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

chatMessageSchema.index({ user: 1, createdAt: 1 });

export default mongoose.model('ChatMessage', chatMessageSchema);