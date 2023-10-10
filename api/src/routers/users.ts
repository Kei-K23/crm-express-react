import express from "express";
import { userControllers } from "../controllers/users";
import {
  isAdmin,
  isAuthenticatedWithSession,
  isAuthenticatedWithID,
  isOwnerOrIsAdmin,
} from "../middlewares/authentication";

export default function (router: express.Router) {
  router.get(
    "/users",
    isAuthenticatedWithSession,
    isAdmin,
    userControllers.getAllUsers
  );
  router.get(
    "/acc/:id",
    isAuthenticatedWithSession,
    isAuthenticatedWithID,
    userControllers.getAuthUser
  );
  router.delete(
    "/users/:id",
    isAuthenticatedWithSession,
    isOwnerOrIsAdmin,
    userControllers.deleteUser
  );
  router.put(
    "/users/:id",
    isAuthenticatedWithSession,
    isOwnerOrIsAdmin,
    userControllers.updateUser
  );
}
