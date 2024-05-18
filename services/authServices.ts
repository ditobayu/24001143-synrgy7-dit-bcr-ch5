import { Request, Response } from "express";
import { UsersModel } from "../model/users";
import { createClient } from "redis";
import { generateToken } from "../middleware/auth";
import { client } from "..";

// register using redis to save the session
const register = async (req: Request, res: Response) => {
  try {
    const user = await UsersModel.query().findOne({ email: req.body.email });
    const token = generateToken();
    if (user) {
      res.status(400).json({ message: "Email already registered" });
    } else {
      const newUser = await UsersModel.query().insert(req.body);
      await client.setEx(token, 600, "valid");
      res.json({ ...newUser, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// login using redis to save the session
const login = async (req: Request, res: Response) => {
  try {
    const user = await UsersModel.query().findOne({ email: req.body.email });
    const token = generateToken();
    if (user && user.password === req.body.password) {
      await client.setEx(token, 600, "valid");
      // set cookie token
      res
        .cookie("token", token, {
          maxAge: 60000 * 1000,
          httpOnly: true,
        })
        .json({ message: "Login successful", token: token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout by deleting the session
const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await client.del(token);
      res.clearCookie("token").json({ message: "Logout successful" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, logout };
