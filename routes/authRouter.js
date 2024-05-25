import express from 'express';
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/authSchemas.js";
import {
  register,
  login,
  logout,
  getCurrent,
} from "../controllers/authControllers.js";
import {checkAuth} from '../middlewares/checkAuth.js';
import  upload  from "../helpers/upload.js";
import { updateAvatar } from "../controllers/usersController.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.post("/login", validateBody(loginUserSchema), login);
authRouter.post("/logout", checkAuth, logout);
authRouter.get("/current", checkAuth, getCurrent);
authRouter.patch("/avatars", checkAuth, upload.single("avatar"), updateAvatar);

export default authRouter;