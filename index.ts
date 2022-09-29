import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import passport from "./src/middleware/passport.google"
import authRouter from './src/routers/auth.router'
import startRouter from './src/routers/auth.router'

import appRoot from "app-root-path";
import cors from "cors";
import path from "path";


import errorToSlack from 'express-error-slack'
import session from "express-session"
import http from 'http';
import morgan from 'morgan'
import {Server} from "socket.io"

import userRouter from "./src/routers/user.router";
/*
import userRouter from "./src/routers/user.router";
*/




const PORT = process.env.PORT || 2212;
const app = express();
const server = http.createServer(app);
// const io = new Server(server)


app.set('view engine', 'ejs')
app.set("views", './src/views')
app.use(express.static('assets'))
app.use(express.static('src/uploads'))

//db connect 
dotenv.config()
mongoose.connect(process.env.DB_MONGOOSE, () => {
    console.log('connect MONGO OK')
})
//static file
const rootPath = appRoot.path;
let publicPath = path.join(rootPath, "src", "public");
app.use(express.static(publicPath));

//logging request den server
app.use(morgan("common"))
//bao ve thong tin server

app.use(helmet());

//tranh tan cong  cau hinh body + passport

app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 60 * 60}
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize());
app.use(passport.session());

// router

app.use("/", startRouter);
app.use("/auth", authRouter);

app.use("/user",userRouter)



//neu router loi thi no se vao day
app.use(errorToSlack({webhookUri: "https://hooks.slack.com/services/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"}))
app.use((err, req, res, next) => {
    if (err) {
        res.json({message: err.message})
    }
})
server.listen(PORT, () => {
    console.log('connect http://localhost:' + PORT)
})