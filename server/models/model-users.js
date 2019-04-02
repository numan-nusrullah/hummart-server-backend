var mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    cart:[{
      type: String,
      default: 0
    }]
  });

  
  const User=mongoose.model('User', UserSchema);
  module.exports =User
  