import mongoose, { Document, Schema, Model } from "mongoose"

export interface IComments extends Document {
  name: string
  timestamp: Date
  message: string
}

const CommentsSchema: Schema<IComments> = new Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true },
  message: { type: String, required: true },
})

const Comment: Model<IComments> = mongoose.models.Comments || mongoose.model<IComments>("Comments", CommentsSchema)

export default Comment
