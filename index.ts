import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
const dotenv = require("dotenv");
import morgan from 'morgan'
// import helmet from 'helmet'
import bodyParser from 'body-parser'
// import {Server} from "socket.io"
import session from "express-session"
import cors from "cors"
import appRoot from "app-root-path";
import * as path from "path";
import { router } from './src/routers/router';

const PORT = process.env.PORT || 2212;
const app = express();
const server = http.createServer(app);
// const io = new Server(server)


app.set('view engine', 'ejs')
app.set('views', './src/views')
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
// app.use(helmet())


//tranh tan cong  cau hinh body + passport
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 60 * 60}
}))

// router
app.use('/',router)



server.listen(PORT, () => {
    console.log('connect http://localhost:' + PORT)
})