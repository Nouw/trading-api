require('dotenv').config();

import * as express from 'express';
import * as cors from 'cors';
import {HttpError} from "http-errors";
export const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false, limit: '20mb'}))
app.use(express.json({limit: '20mb'}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

const baseRouter = express.Router();
app.use('/', baseRouter);


app.use((req, res, next) => {
    res.status(404)
    res.json(`Could not find the resource ${req.method} ${req.path}`)
});

app.use((err: HttpError, req: any, res: any, next: any) => {
    console.log(err);
    res.status(err.status || 500);
    res.send(err);
});

const WebSocket = require('ws');

const ws = new WebSocket('wss://ws.xtb.com/demoStream');

ws.on('open', function () {
    
})
