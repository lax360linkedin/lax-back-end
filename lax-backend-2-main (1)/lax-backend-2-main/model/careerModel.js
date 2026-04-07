import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,

    jobTitle: {
      type: String,
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
