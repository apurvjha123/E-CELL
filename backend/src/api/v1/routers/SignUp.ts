import { Request, Router, Response } from "express";
import { hashPassword } from "../services/hashPassword";
import Signup from "../schema/Signup";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
  if (!secretKey) throw new ApiError(500,"Server Error");
  const { email, username, password } = req.body;
  if (!email || !username || !password)
   throw new ApiError(404,'Please provide email , username , password')
  // Checking the length of user inputs
  else if (email.length < 5 || username.length < 2) {
    throw new ApiError(401,"Please provide Username and email of required length")
  }
  // Validate email format
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
    throw new ApiError(401,"Please enter a valid email address");
  }

  try {
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      throw new ApiError(400,"User already exists");
    }
    // Checking password special character
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) ||
      !/\d/.test(password)
    ) {
      return res.status(403).json({
        auth: false,
        message:
          "Password should contain at least one uppercase letter, one lowercase letter, one special character, and one number.",
      });
    }
    // created hashed password for security
    const hashedpassword: string = hashPassword(password);
    // adding these data to mongodb
    const SignupId = await Signup.create({
      email: email,
      username: username,
      password: hashedpassword,
    });
    // create token
    const token = jwt.sign({id: SignupId._id},secretKey, {expiresIn: '7d'})
    
    return res.status(200).json({
        id: SignupId._id,
        email: SignupId.email,
        username: SignupId.username,
        token : token,
        status: 200,
        message: "User has been registered successfully"
        });
  } catch (error) {
    console.log("Oops! Some error Occurs.", error);
  }
});

export default router;
