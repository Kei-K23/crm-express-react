import express from "express";
import auth from "./auth";
import user from "./users";
const router = express.Router();

export default (): express.Router => {
  auth(router);
  user(router);
  return router;
};
