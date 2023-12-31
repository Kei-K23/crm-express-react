import {
  deleteByID,
  getAllUsers,
  getUserBySessionToken,
  updatedByID,
} from "../db/user";
import express from "express";

export const userControllers = {
  getAllUsers: async function (req: express.Request, res: express.Response) {
    try {
      const users = await getAllUsers();

      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "something went wrong" });
    }
  },

  getAuthUser: async function (req: express.Request, res: express.Response) {
    try {
      const sessionToke = req.cookies["crmCookie"];
      const authUser = await getUserBySessionToken(sessionToke);
      return res.status(200).json(authUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "something went wrong" });
    }
  },

  deleteUser: async function (req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({ message: "Missing request fields" });
      await deleteByID(id);

      const sessionToken = req.cookies["crmCookie"];

      res.clearCookie("crmCookie", {
        domain: "localhost",
        path: "/",
      });

      return res.status(200).json({ message: `User deleted with id ${id}` });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "something went wrong" });
    }
  },

  updateUser: async function (req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({ message: "Missing request fields" });

      if (!req.body)
        return res.status(400).json({ message: "Missing request fields" });

      const updatedUser = await updatedByID(id, req.body);
      await updatedUser.save();
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "something went wrong" });
    }
  },
};
