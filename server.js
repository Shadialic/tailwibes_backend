import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import teacherRouter from "./routes/teacherRoutes.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
    methods: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", teacherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
