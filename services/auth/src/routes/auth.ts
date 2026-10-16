import express from "express"
import { loginUser, myProfile } from "../controller/auth.js";
import { isAuth, addUserRole } from "../middelware/isAuth.js";

const routes = express.Router();

routes.post("/login", loginUser);
routes.put("/add/role", isAuth, addUserRole);
routes.get("/profile", isAuth, myProfile);;

export default routes;