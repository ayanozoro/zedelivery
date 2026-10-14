import express from "express"
import { loginUser } from "../controller/auth.js";

const routes = express.Router();

routes.post("/login", loginUser);

export default routes;