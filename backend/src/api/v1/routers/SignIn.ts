import { Router, Response, Request } from "express";
import Signup from "../schema/Signup";
import { compareHashedPassword } from "../services/hashPassword";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

  if (!secretKey) throw new ApiError(500,"Server Error");
  // fetching credentials
  const { username, password } = req.body;
  if (!username || !password)
    throw new ApiError(400,"Please provide username or password");
   
  try {
    // finding data in database
    let user = await Signup.findOne({ username });
    if (!user) throw new ApiError(404,"User not found");
    // compare passwords - bcrypt
    const isPasswordValid = compareHashedPassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401,"Invalid Password");
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Oops! Some error Occurs.", error);
  }
});

export default router;
