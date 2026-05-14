import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: { type: String, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 32 },
    message: { type: String, required: false, default: '', trim: true, maxlength: 2000 },
    locale: { type: String, enum: ['en', 'fa', 'ps'], default: 'en' },
    emailDelivery: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
      index: true,
    },
    emailError: { type: String, default: null },
    source: { type: String, default: 'web' },
    ip: { type: String, default: null },
  },
  { timestamps: true }
);

ContactMessageSchema.index({ createdAt: - 1 });

export default mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', ContactMessageSchema);
