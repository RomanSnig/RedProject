const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admins', {useNewUrlParser: true, useUnifiedTopology: true});

const adminRouter = require('./routes/adminRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req,res) => {
    res.end('GOOD')
});
app.use('/admin', adminRouter);
app.use('*', (req, ses)=> {
    res.status(404).json('Page not found')
});
app.listen(3000, ()=> {
    console.log('listening');
})


