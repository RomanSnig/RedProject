const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBase = require('./dataBase/connect');
const {client} = require('./dataBase/Elasticsearch/connect');

const adminRouter = require('./routes/adminRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req,res) => {
    res.end('GOOD')
});
app.use('/admin', adminRouter);
app.use('*', (req, res)=> {
    res.status(404).json('Page not found')
});
app.listen(process.argv[2], ()=> {
    console.log('listening');
});
// console.log(process.env.PORT);
// console.log(process.env.MONGO);
