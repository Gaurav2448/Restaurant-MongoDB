require("dotenv").config();
const express = require('express');
const app = express();
const connectDB=require("./util/db");
const authRoute=require("./router/auth");
const cors=require('cors');
const port = 3000;

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth",authRoute);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`);
    })
});