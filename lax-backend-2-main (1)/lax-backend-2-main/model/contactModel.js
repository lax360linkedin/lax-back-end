import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
    Name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        trim: true
    },

    service: {
        type: String
    },

    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;