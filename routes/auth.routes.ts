import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User, IUser} from "../models/User.model";
import isAuthenticated from "../middlewares/isAuthenticated"

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("Auth routes");
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    // Hash password
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // Create the User
    await User.create({
      username: req.body.username,
      email: req.body.email,
      passwordHash: hashedPassword,
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  // Check for user
  const matchedUsers:IUser[] = await User.find({
    username: req.body.username,
  }).populate("trips");
  if (matchedUsers.length) {
    const currentUser:IUser = matchedUsers[0];
    // Check password
    if (bcrypt.compareSync(req.body.password, currentUser.passwordHash)) {
      // Generate token
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            user: {
              username: currentUser.username,
              createdAt: currentUser.createdAt,
              _id: currentUser._id,
              email: currentUser.email,
              trips: currentUser.trips
            },
          },
        },
        process.env.TOKEN_SECRET as jwt.Secret,
        {
          algorithm: "HS256",
        }
      );
      res.status(200).json({ token });
      console.log(token)
    } else {
      res.status(403).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

interface CustomRequest extends Request {
  payload?: any;
}

router.get("/verify", isAuthenticated, (req:CustomRequest, res:Response) => {
    if (req.payload) {
      return res.json(req.payload.data.user);
    }
  });

export default router;
