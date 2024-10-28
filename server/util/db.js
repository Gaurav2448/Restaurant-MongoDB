const mongoose=require('mongoose');

const uri=process.env.MONGODB;
const connectDB=async()=>
{
    try{
        await mongoose.connect(uri);
        console.log("connected to db ");
        
    }catch(err){
        console.log("connection failed",err);
        process.exit(0);
    }
}

module.exports=connectDB;