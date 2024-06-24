const Book=require("../models/book_model");
const home = async (req, res) => {
    try {
        res.status(200).send("Wlcome");
    } catch (err) {
        console.log(err);
    }
}

const book=async(req,res)=>{
    try {
        const response=req.body;
        const cbook=await Book.create(response);
        return res.status(200).json({message:cbook})
        
    } catch (error) {
        return res.status(500).json({message:"booking not done"})
    }
}

const view=async(req,res)=>{
    try {
        const bookings=await Book.find();
        if(!bookings || bookings.length===0){
            return res.status(404).json({message:"NO Booking Found"});
        }
        return res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
    }
}

const getUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Book.findOne({_id:id}); 
        return res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
    }
}

const deleteById=async(req,res)=>{
    try {
        const id=req.params.id;
        await Book.deleteOne({_id:id}); 
        return res.status(200).json({message:"Booking deleted Successfully"});
    } catch (error) {
        console.log(error);
    }
}

const updateById=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateData=req.body;
        const updateUser=await Book.updateOne({_id:id},{$set:updateData}); 
        return res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { home,book,view,deleteById ,getUserById,updateById};
