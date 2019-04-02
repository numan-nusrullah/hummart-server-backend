var mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;


const imageSchema =new mongoose.Schema({image:{type:String},quantity:{type:String},description:{type:String},name:{type:String},price:{type: Number},category:{type:String}})

const Images= mongoose.model( 'images',imageSchema );

module.exports = Images