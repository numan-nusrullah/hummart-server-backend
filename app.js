var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var mongoose = require('mongoose');

var server = express()
server.use(cors());
mongoose.connect('mongodb://localhost:27017/Hum-Mart',{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(err)
    }else {
        console.log('DB Connected')
    }
})
server.use(express.static('./build'))
server.use('/uploads',express.static('./uploads'));
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


require('./server/config/passport-config')(server, users);
require('./server/routes/all-routes')(server);

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

server.listen(process.env.PORT || 8000, () => console.log("server is running"))