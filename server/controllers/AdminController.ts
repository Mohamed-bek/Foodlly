import { serialize } from "cookie";
import { Request, Response } from "express";
import Admin from "../models/Admin"; // Adjust path accordingly

export const LoginAdmin = async (req: Request, res: Response) => {
  try {
    console.log("register");
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw Error("Admin not found");
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw Error("Invalid password");
    }
    const token = admin.generateAuthToken();
    console.log("token", token);

    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS
      secure: process.env.NODE_ENV === "production", // Set to true only in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/", // Available on all routes
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

// res.setHeader(
//   "Set-Cookie",
//   serialize("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 60 * 60, // 1 hour
//     path: "/",
//   })
// );

export const Logout = async (req: Request, res: Response) => {
  try {
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      })
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

// interface AuthRequest extends Request {
//   admin?: any;
// }

// export const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.admin = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// };
