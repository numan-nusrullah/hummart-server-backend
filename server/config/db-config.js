var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db_url = 'mongodb://localhost:27017/Hum-Mart'
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });