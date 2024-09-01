import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  subject: {
    type: String,
  },
  mark: {
    type: Number,
  },
  status: {
    type: String,
    default: false,
  },
  tutorId: {
    type: String,
  },
});

const Students = mongoose.model("Students", studentsSchema);
export default Students;
