import mongoose from 'mongoose';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const slotRegex = /^\d{2}:\d{2}$/;

const AppointmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: { type: String, required: false, default: '', trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 32 },
    // YYYY-MM-DD — clinic-local date, no timezone ambiguity
    preferredDate: {
      type: String,
      required: true,
      match: [dateRegex, 'preferredDate must be YYYY-MM-DD'],
    },
    // HH:MM 24h — discrete clinic slot
    slot: {
      type: String,
      required: true,
      match: [slotRegex, 'slot must be HH:MM'],
    },
    message: { type: String, default: '', trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    source: { type: String, default: 'web' },
  },
  { timestamps: true }
);

AppointmentSchema.index({ createdAt: -1 });

// Prevent double-booking the same date+slot for an active appointment.
// Cancelled slots are released so the partial filter excludes them.
AppointmentSchema.index(
  { preferredDate: 1, slot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'confirmed'] } },
    name: 'unique_active_slot',
  }
);

export default mongoose.models.Appointment ||
  mongoose.model('Appointment', AppointmentSchema);
