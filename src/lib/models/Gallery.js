import mongoose from 'mongoose';

/**
 * Gallery image record.
 *
 * The binary lives in Cloudinary (folder: dr-shkari-glarry); this
 * document stores the canonical reference + display metadata so the
 * frontend can render responsive variants without re-querying
 * Cloudinary. `publicId` is the source of truth — `url` is denormalized
 * for fast list rendering when the client doesn't want to recompute it.
 */
const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },

    // Cloudinary identifiers
    publicId: { type: String, required: true, index: true, unique: true },
    url: { type: String, required: true }, // secure_url at upload time
    format: { type: String, default: '' }, // jpg, png, webp...
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bytes: { type: Number, default: 0 },

    // Ordering / visibility — `order` is small-first; `featured` lets a
    // few images jump to the hero band on the home page.
    order: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

GallerySchema.index({ published: 1, order: 1, createdAt: -1 });

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
