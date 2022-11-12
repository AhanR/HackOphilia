import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cases from '../models/case'
import users from "../models/user";

export const addCase = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const caseId = new mongoose.Types.ObjectId();
        const patientId = req.body.patient.id;
        const doctorId = req.body.doctor.id;
        const creatorId = req.body.user.id;
        const comments = req.body.comments;
    
        if(!patientId || !doctorId || !creatorId) return res.status(404).json({message : "invalid fields"}); 
    
        try {
            const newCase = new cases({
                caseId,
                patientId,
                doctorId,
                creatorId,
                comments
            });
            newCase.save();
            return res.status(200).json({ message : "case created", newCase });
        } catch (e) {
            return res.status(402).json({ message : e });
        }
    } catch (e) {
        return res.status(402).json({ message : e });
    }
}

export const getCase = async (req : Request, res : Response, next : NextFunction) => {
    const doctorId = req.params.doctorId;
    if(doctorId) {
        try{
            const newCases = await cases.find({ doctorId });
            return res.status(200).json({ message : "pertainig cases fetched", newCases });
        } catch (e) {
            return res.status(402).json({ message : e });
        }
    }
    else {
        try{
            const newCases = await cases.find();
            return res.status(200).json({ message : "pertainig cases fetched", newCases });
        } catch (e) {
            return res.status(402).json({ message : e });
        }
    }
}

export const updateCase = async (req : Request, res : Response, next : NextFunction) => {
    const caseId = req.params.caseId;
    if( req.body.user.type == "doctor" ) {
        cases.updateOne({ medicines : req.body.medicines }, (err : Error, result : any) => {
            if(err) {
                return res.status(402).json({ message : err.message });
            } else {
                console.log(result);
                return res.status(200).json({ message : "operation succesful" });
            }
        } );
    }
    else return res.status(401).json({ message : "access denied" });
}