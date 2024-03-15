const mongoose = require('mongoose');
const express = require('express');
const Book = require('./modelss/bookmodel.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.post('/addbook', async (req, res) => {
    try{
        const book = await Book.create(req.body);
        res.status(201).json(book)
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
    });
app.get('/getbooks', async (req, res) => {
   try{
    const Books = await Book.find();
    res.status(200).json(Books);
   } catch(err){
    console.log(err);
    res.status(400).json({message:'Something went wrong'});
   }
});
app.delete('/deletebook/:id', async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            res.status(404).json({message:'Student not found ${id}'});
        }
        res.status(200).json(book);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
});
app.put('/updatebook/:id', async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        if(!book){
            res.status(404).json({message:'Book not found ${id}'});
        } 
        const updatebook=await Book.findById(req.params.id);
        res.status(200).json(updatebook);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
});
   



mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/onlinebookstoreappln', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to local MongoDB');
    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to local MongoDB:', error);
  });