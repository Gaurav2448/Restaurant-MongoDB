const{Schema,model}=require('mongoose');

const bookSchema=new Schema({
    uname:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true}
});

const Book=new model("Book",bookSchema);
module.exports=Book;