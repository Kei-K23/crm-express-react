import { _merge, _get } from "../lib/utility";
import { getUserBySessionToken } from "../db/user";
import express from "express";

export async function isOwnerOrIsAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;
    const currentUserID = _get(req, "identity._id").toString();
    const role = _get(req, "identity.role_id").toString();

    if (role === "2") {
      return next();
    } else if (role === "1") {
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
      return next();
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
}

export async function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const role = _get(req, "identity.role_id").toString();

    if (role !== "2")
      return res.status(403).json({
        message: "You have no right authorization to perform",
      });

    return next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
}

export async function isAuthenticatedWithSession(
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

export async function isAuthenticatedWithID(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;
    const sessionToken = req.cookies["crmCookie"];

    const existingUser = await getUserBySessionToken(sessionToken);

    if (existingUser._id.toString() !== id)
      return res.status(403).json({
        message: "User is not register",
        register_link: "http://localhost:8080/auth/register",
      });

    return next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
}
