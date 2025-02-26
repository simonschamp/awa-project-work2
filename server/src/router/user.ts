import { Request, Response, Router } from "express";
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { validateToken } from "../middleware/validateToken";

const router: Router = Router();

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }).escape(),
  body("password").isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    // we trying to validate the  user inputs
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const existingUser: IUser | null = await User.findOne({
        username: req.body.username,
      });
      console.log(existingUser);
      if (existingUser) {
        res.status(403).json({ username: "username already in use" });
      }
      // we salt the password
      const salt: string = bcrypt.genSaltSync(10);
      const hash: string = bcrypt.hashSync(req.body.password, salt);
      // save the username and the hash to the database
      await User.create({
        username: req.body.username,
        password: hash,
      });
      res.status(200).json({ message: "User registered successfully" });
    } catch (error: any) {
      console.error(`Error during registration: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login

router.post(
  "/login",
  body("username").trim().escape(),
  body("password").escape(),
  async (req: Request, res: Response) => {
    try {
      const user: IUser | null = await User.findOne({
        username: req.body.username,
      });

      //console.log(user)

      if (!user) {
        res.status(403).json({ message: "Login failed" });
      }
      if (user)
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const jwtPayload: JwtPayload = {
            id: user._id,
            username: user.username,
          };
          const token: string = jwt.sign(
            jwtPayload,
            process.env.SECRET as string,
            { expiresIn: "2m" }
          );
          res.status(200).json({ success: "true", token });
        } else {
          res.status(401).json({ message: "Login failed" });
        }
    } catch (error: any) {
      console.error(`Error during user login: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// way to get list of users
router.get("/list", validateToken, async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(`Error while fecthing users ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
