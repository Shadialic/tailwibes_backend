import { Router } from "express";
import { loginTeacher, postTeacher } from "../controllers/teacherControllers.js";
import { deleteAllStudents, deleteStudent, editStudent, getStudent, postStudent, searchStudents } from "../controllers/studensControllers.js";
import auth from '../middleware/authMiddleware.js'
const teacherRouter = Router();


//GET
teacherRouter.get('/getStudent/:id',auth,getStudent)
teacherRouter.get('/searchStudent',auth,searchStudents)
//POST
teacherRouter.post('/register',postTeacher)
teacherRouter.post('/login',loginTeacher)
teacherRouter.post('/postStudent',auth,postStudent)
//PUT
teacherRouter.put('/editStudent/:id',auth, editStudent);
//DELETE
teacherRouter.delete('/deleteStudent/:id',auth, deleteStudent);
teacherRouter.delete('/deleteAllStudent',auth,deleteAllStudents);








export default teacherRouter;


