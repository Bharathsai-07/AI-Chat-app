import morgan from "morgan";
import express from "express";
import connect from "./db/db.js";
connect();
const app=express();
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello');
});

export default app;