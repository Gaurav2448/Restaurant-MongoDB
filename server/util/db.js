const mongoose=require('mongoose');

const URI="mongodb+srv://gauravshirke895:8ppx1R6oqRDP4QXa@cluster0.evjjlcb.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";
const uri=process.env.MONGODB;
const connectDB=async()=>
{
    try{
        await mongoose.connect(uri);
        console.log("connected to db ");
        
    }catch(err){
        console.log("connection failed");
        process.exit(0);
    }
}

module.exports=connectDB;