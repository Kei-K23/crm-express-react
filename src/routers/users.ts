import express from "express";
import { userControllers } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/authentication";

export default function (router: express.Router) {
  router.get("/users", isAuthenticated, userControllers.getAllUsers);
  router.delete(
    "/users/:id",
    isAuthenticated,
    isOwner,
    userControllers.deleteUser
  );
  router.put(
    "/users/:id",
    isAuthenticated,
    isOwner,
    userControllers.updateUser
  );
}
