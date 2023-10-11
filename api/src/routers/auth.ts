import express from "express";

import { authControllers } from "../controllers/auth";

export default function (router: express.Router) {
  router.post("/auth/register", authControllers.register);
  router.post("/auth/login", authControllers.login);
  router.get("/auth/logout", authControllers.logout);
}
