import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
  createdAt: Date
  read: boolean
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    budget: { type: String, trim: true, maxlength: 60, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Safe model registration — avoids recompilation errors during Next.js hot reload
const Contact: Model<IContact> =
  (mongoose.models.Contact as Model<IContact>) ??
  mongoose.model<IContact>('Contact', ContactSchema)

export default Contact
