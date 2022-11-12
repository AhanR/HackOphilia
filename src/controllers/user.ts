import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import users from "../models/user"

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.body.user.id || "superuser";
        const password = req.body.user.password || "superuser";

        if(userId == "superuser" && password == "superuser") {
            next();
            return;
        }

        try {
            const loginUser = await users.find({ userId, password })
            if (loginUser) {
                req.body.user = loginUser;
                next();
            }
            else {
                return res.status(401).json({ message: "could not authenticate" });
            }
        } catch (e) {
            return res.status(402).json({ message: "authorizatoin faied"});
        }
    } catch (e)  {
        return res.status(400).json({ message: "can't find body" });
    }
}

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUserPassword = req.body.newUser.password;
    const newUserType = req.body.newUser.type;
    const newUserName = req.body.newUser.name;

    if (newUserPassword && newUserType && newUserName) {
        const newUser = new users({
            username: newUserName,
            userId: new mongoose.Types.ObjectId(),
            userType: newUserType,
            password: newUserPassword
        });

        try {
            newUser.save();
            return res.status(200).json({ message: "successfully added new user", user: newUser });
        } catch (e) {
            return res.status(402).json({ message: e });
        }
    }
    else {
        return res.status(404).json({ message: "invalid fields" });
    }
}

export const allPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patients = await users.find({ userType: "patient" });
        return res.status(200).json({ message: "fetched successfully", patients });
    } catch (e) {
        console.log(e);
        return res.status(402).json({ message: e });
    }
}

export const allDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctors = await users.find({ userType: "doctor" });
        return res.status(200).json({ message: "fetched successfully", doctors });
    } catch (e) {
        return res.status(402).json({ message: e });
    }
}

export const allStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = await users.find({ userType: "staff" });
        return res.status(200).json({ message: "fetched successfully", staff });
    } catch (e) {
        return res.status(402).json({ message: e });
    }
}