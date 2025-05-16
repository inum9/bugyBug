import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String, // Cloudinary secure URL
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now()
  }
});

export const Attachment= mongoose.model('Attachment', attachmentSchema);
