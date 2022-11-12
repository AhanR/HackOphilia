import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import mongoose from 'mongoose';
import bodyParser, { BodyParser } from 'body-parser';
import cors from 'cors';
import { auth } from './src/controllers/user';
import caseRoutes from './src/routes/case';
import userRoutes from './src/routes/user';

const router = express();

const port = 15000;
const dbHost = "mongodb://localhost/hackophilia-medical-app"

mongoose
.connect(dbHost)
.then(() => {
    console.log("connected to db");
    runRoutes();
})
.catch(e => {
    console.log(e);
})

function runRoutes():void {
    router.use(cors());
    router.use(bodyParser.json());

    router.use(auth);

    router.use('/user', userRoutes);
    router.use('/case', caseRoutes);

    router.use((req, res, next)=>{
        console.log("invalid query by : " + req.ip);
        res.status(404).json({message : "invalid query"});
    });

    http.createServer(router).listen(port, () => {
        console.log("running server..");
    })
}