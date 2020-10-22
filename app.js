const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBase = require('./dataBase/connect');
const {client} = require('./dataBase/Elasticsearch/connect');

const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const worksRouter = require('./routes/worksRouter');
const lookupRouter = require('./routes/lookupRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req,res) => {
    res.end('GOOD')
});
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/works', worksRouter);
app.use('/lookup', lookupRouter);

app.use('*', (req, res)=> {
    res.status(404).json('Page not found')
});
app.listen(3000, ()=> {
    console.log('listening');
});
