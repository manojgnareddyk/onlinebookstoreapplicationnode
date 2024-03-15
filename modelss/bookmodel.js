const mongoose=require('mongoose');

const bookschem=mongoose.Schema(
    {
        bookname:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        availability:{
            type:String,  //email should be unique for every user
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }

        },{
        timeStamp:true
    });

const Book = mongoose.model('Book',bookschem);
module.exports=Book;