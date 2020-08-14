import mongoose from "mongoose"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: phone,
  },
  managers: [{ type: Schema.Types.ObjectId, ref: "Manager" }],
})

export default mongoose.model("Team", teamSchema)
