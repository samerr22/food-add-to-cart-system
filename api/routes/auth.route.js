import express from "express";
import {  signgin,   signup,  singOut, Ssigngin, Ssignup } from "../controllers/auth.controller.js";




const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/signout", singOut)
route.post("/ssignup", Ssignup);
route.post("/ssignin", Ssigngin);



export default route;
