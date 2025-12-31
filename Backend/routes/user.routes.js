import express from "express";
import { userSignUp, loginUser, updateUser, getUser , getAllUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", loginUser);
// router.get("/:id", getUser);           
router.put("/update/:id", updateUser);
router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getUser);

export default router;
