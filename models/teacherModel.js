import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
