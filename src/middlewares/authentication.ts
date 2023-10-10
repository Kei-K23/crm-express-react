import { _merge, _get } from "../lib/utility";
import { getUserBySessionToken } from "../db/user";
import express from "express";

export async function isOwner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;
    const currentUserID = _get(req, "identity._id").toString();
    console.log(currentUserID);

    if (!currentUserID)
      return res.status(403).json({
        message: "User is not register",
        register_link: "http://localhost:8080/auth/register",
      });
    if (currentUserID !== id)
      return res.status(403).json({
        message: "Unauthorized user",
        register_link: "http://localhost:8080/auth/register",
      });

    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
}

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const sessionToken = req.cookies["crmCookie"];

    if (!sessionToken)
      return res.status(403).json({
        message: "User is not register",
        register_link: "http://localhost:8080/auth/register",
      });

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser)
      return res.status(403).json({
        message: "User is not register",
        register_link: "http://localhost:8080/auth/register",
      });

    _merge(req, { identity: existingUser });

    return next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
}
