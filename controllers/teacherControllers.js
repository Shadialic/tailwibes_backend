import TeacherDb from "../models/teacherModel.js";
import bcrypt from "bcryptjs";
import { createSecretToken } from "../utils/Jwt/secretoken.js";

const postTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const exist = await TeacherDb.findOne({ email });
    if (exist) {
      return res.json({ message: "Email already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await TeacherDb.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    if (data) {
      const token = createSecretToken(data.id);
      if (token) {
        res.status(200).json({
          Data: data,
          status: true,
          err: null,
          token,
          message: "Teacher saved successfully",
        });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
    console.log(err);
  }
};
const loginTeacher = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const exist = await TeacherDb.findOne({ email });
    if (exist) {
      if (password && exist.password) {
        const compared = await bcrypt.compare(password, exist.password);
        if (compared) {
          const token = createSecretToken(exist.id);
          res.status(200).json({
            Data: exist,
            status: true,
            err: null,
            token,
          });
        } else {
          res.json({ message: "Incorrect password!" });
        }
      } else {
        res.json({ message: "Password is missing!" });
      }
    } else {
      res.json({ message: "Email not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

export { postTeacher, loginTeacher };
