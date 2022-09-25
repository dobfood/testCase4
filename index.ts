import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import {Server} from "socket.io"
import session from "express-session"
import cors from "cors"
import appRoot from "app-root-path";
import * as path from "path";

const PORT = process.env.PORT || 2212;
const app = express();
const server = http.createServer(app);
const io = new Server(server)


app.set('view engine', 'ejs')
app.set('views', './src/views')

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
app.use(helmet())


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

app.use((error, req, res, next) => {
    console.error(error.mesage);
    res.status(500).end();
})


app.get('/', (req, res) => {
    res.render('login')
})


server.listen(PORT, () => {
    console.log('connect http://localhost:' + PORT)
})