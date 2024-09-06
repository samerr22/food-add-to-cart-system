import express from "express";
import {  signgin,   signup,  singOut } from "../controllers/auth.controller.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/signout", singOut)



export default route;
