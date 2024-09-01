import StudentDb from "../models/studentsModel.js";

const postStudent = async (req, res) => {
  try {
    console.log(req.body,'pdpd');
    
    const { fullName, subject, mark,tutorId } = req.body;
    const existingStudent = await StudentDb.findOne({ fullName, subject });
    if (existingStudent) {
      existingStudent.mark += mark;
      await existingStudent.save();
      return res.json({
        status: true,
        message: "Marks updated successfully",
        student: existingStudent,
      });
    } else {
      const newStudent = await StudentDb.create({
        fullName,
        subject,
        mark,
        tutorId,
      });
      return res.json({
        status: true,
        message: "Student added successfully",
        student: newStudent,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,'tutorId');
    
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Tutor ID is required" });
    }
    const students = await StudentDb.find({tutorId: id });
    console.log(students,'students');
    
    res.status(200).json({ status: true, students });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};

const editStudent = async (req, res) => {
  const { id } = req.params;
  const { fullName, subject, mark } = req.body;
  try {
    const student = await StudentDb.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }
    student.fullName = fullName || student.fullName;
    student.subject = subject || student.subject;
    student.mark = mark || student.mark;
    await student.save();
    res
      .status(200)
      .json({ status: true, message: "Student updated successfully", student });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentDb.findByIdAndDelete(id);
    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Student deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    const result = await StudentDb.deleteMany({});
    res.status(200).json({
      status: true,
      message: "All students deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};

const searchStudents = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    let searchCriteria = {
      $or: [
        { fullName: { $regex: searchQuery, $options: "i" } },
        { subject: { $regex: searchQuery, $options: "i" } },
      ],
    };
    const markQuery = Number(searchQuery);
    if (!isNaN(markQuery)) {
      searchCriteria.$or.push({ mark: markQuery });
    }
    const students = await StudentDb.find(searchCriteria);
    res.status(200).json({ status: true, students });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
    console.log(err);
  }
};

export {
  postStudent,
  getStudent,
  editStudent,
  deleteStudent,
  deleteAllStudents,
  searchStudents,
};
