const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBase = require('./dataBase/connect');

const lookupRouter = require('./routes/lookupRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req,res) => {
    res.end('GOOD')
});
app.use('/lookup', lookupRouter);
app.use('*', (req, res)=> {
    res.status(404).json('Page not found')
});
app.listen(process.argv[2], ()=> {
    console.log('listening Lookup');
});
// console.log(process.env.PORT);
// console.log(process.env.MONGO);
