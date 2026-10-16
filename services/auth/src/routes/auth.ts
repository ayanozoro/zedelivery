import express from "express"
import { loginUser } from "../controller/auth.js";
import { isAuth, addUserRole } from "../middelware/isAuth.js";

const routes = express.Router();

routes.post("/login", loginUser);
routes.put("/add/role", isAuth, addUserRole);

export default routes;