import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true, minlength: 2 },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true,
                match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'] },
    password: { type: String, required: true, minlength: 6, select: false },
    initials: { type: String },
    role:     { type: String, enum: ['student', 'admin'], default: 'student' },
    xp:       { type: Number, default: 0 },
    level:    { type: Number, default: 1 },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.initials = this.name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);