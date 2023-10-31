import express from "express"
import {Request, Response} from "express"
import session, { SessionOptions } from 'express-session'
declare module 'express-session' {
    interface SessionData {
        kawahara: number,
        like_arr: any
    }
}
const app = express()
const sess: SessionOptions = {
    // dummy
    secret: 'session_secret',
    // 1min = 60 * 1000
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
};

app.use(session(sess))

let count = 1

app.get("/", (req: Request, res: Response) => {
    req.session.kawahara = count
    count += 1
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req: Request, res: Response) => {
    res.json({count: req.session.kawahara});
})


app.listen(3000, () => {
    console.log("localhost:3000")
})