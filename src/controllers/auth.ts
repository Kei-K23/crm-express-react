import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserByEmailWithCredentials,
} from "../db/user";
import { randomHash, authentication } from "../lib/authHelper";
import { expireDate } from "../lib/expireDate";

export const authControllers = {
  register: async function (req: express.Request, res: express.Response) {
    try {
      const { email, name, password, phone, address, role, photo } = req.body;

      if (!email || !name || !password || !phone || !address) {
        return res.status(400).json({ message: "Missing request data fields" });
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ message: "User already exist" });

      const salt = randomHash();
      const createdUser = await createUser({
        name,
        email,
        phone,
        address,
        role,
        photo,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      });

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "something went wrong" });
    }
  },
  login: async function (req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Missing request data fields" });

      const user = await getUserByEmailWithCredentials(email);

      if (!user)
        return res.status(403).json({
          message: "User is not register",
          register_link: "http://localhost:8080/auth/register",
        });

      const authHash = authentication(user.authentication.salt, password);
      if (authHash !== user.authentication.password)
        return res.status(403).json({
          message: "User is not register",
          register_link: "http://localhost:8080/auth/register",
        });

      const salt = randomHash();
      user.authentication.sessionToken = authentication(
        salt,
        user._id.toString()
      );
      await user.save();
      res.cookie("crmCookie", user.authentication.sessionToken, {
        domain: "localhost",
        path: "/",
        expires: expireDate(7),
      });
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "something went wrong" });
    }
  },
};
