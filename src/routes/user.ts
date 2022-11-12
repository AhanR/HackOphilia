import express from "express";
import { addUser, allPatients, allDoctors, allStaff } from "../controllers/user";

const userRoutes = express();

userRoutes.post('/add', addUser);
userRoutes.get('/patients', allPatients);
userRoutes.get('/doctors', allDoctors);
userRoutes.get('/staff', allStaff);

export default userRoutes;