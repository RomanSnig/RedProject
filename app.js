const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBase = require('./dataBase/connect');

const adminRouter = require('./routes/adminRouter');
const personRouter = require('./routes/personRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req,res) => {
    res.end('GOOD')
});
app.use('/admin', adminRouter);
app.use('/person', personRouter);

app.use('*', (req, res)=> {
    res.status(404).json('Page not found')
});
app.listen(3000, ()=> {
    console.log('listening');
});
