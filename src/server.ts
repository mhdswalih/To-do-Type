import express from 'express';
import dotenv from 'dotenv'
import path from "path"
import morgan from 'morgan'
import router from './Router/router';
let port : number = 4200
dotenv.config()

const app = express();

app.use('/',router )
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "./view"));

app.use((req,res,next) => {
    console.log(req.body);
    next()
})

app.use(express.static(path.join(__dirname, "../src/public")));
app.use(express.static(path.join(__dirname, "../dist/public")));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((morgan('dev')))



app.listen(port,()=>{
    console.log(`server running`);
    
})
