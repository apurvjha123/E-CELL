import {Router, Request, Response} from 'express';
import Student from '../schema/StudentDetails';
import { jwtAuthMiddleware } from '../middlewares/jwtAuthMiddleware';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

const router = Router();

router.post('/', jwtAuthMiddleware ,async(req:Request, res:Response)=>{
    const {name ,std , stream, interest, skills, resume, userId }= req.body
    try{
    if (!name || !std || !interest){
        throw new ApiError(400,"Please provide name,std and interest")
    }
    // save the data in database here
    const newStudent = new Student({
        userId,
        name,
        std,
        stream,
        interest,
        skills,
        resume,
      });
  
      // Save the new student to the database
      await newStudent.save();
  
      return res.status(201).json(new ApiResponse(201,newStudent,"Student Created Succesfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(501,"Internal Server Error");
    }
})

router.get('/',jwtAuthMiddleware,async(req: Request, res:Response)=>{
  const {userId} = req.body;
  if (!prompt || !userId) {
    return res.status(400).send({ error: "Missing prompt or userId field" });
  }
   const students =await Student.findOne({userId});
   if(!students) throw new ApiError(404,"Student not found");
    else {
      return res.status(200).json(students);
    }
   
})


export default router;