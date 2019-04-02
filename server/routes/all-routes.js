var passport = require('passport');
var fs = require('fs')

var Images = require('../models/modelproducts.js')
var User = require('../models/model-users')
var upload = require('../config/multer-config')

module.exports = function (server) {

    server.get('/getAllProducts', (req, res) => {
        Images.
            find().
            exec(function (err, products) {
                if (err) {
                    return res.json({ success: false, err: err })
                }
                res.json({ success: true, data: products })
            });
    })
    server.post('/profile',upload.single('mypic'),function (req, res, next) {
       console.log(req)
       
        var image1 = new Images({image:req.file.path,name:req.body.name,price:req.body.price,description:req.body.description,quantity:req.body.quantity,category:req.body.category})
        image1.save((err, user) => {
            if (err) {
                return res.json({ "success": false, err: err })
            }
            res.json({" success": true, "data": user })
        });
       
    })

  server.get('logout',function(req,res){
      req.logout();
      req.send('logout');
  });
  server.post('/addCart',(req,res) => {
      User.findByIdAndUpdate(req.body.user,
        {$push:{cart:req.body.product}},
        function(err,products){
            if(err){
                return res.json({success:false,err:err})
            }
            res.json({'success':true, 'data':products})
        }
        );
  })

   server.post('/cart',(req,res)=> {
       User.findOne({_id:req.body.user},
        function(err,products){
            if(err) {
                return res.json({success:false,err:err})
            }
            res.json({'success':true,'data':products})
        });
   })

   server.post('/login', passport.authenticate('local'),(req,res)=>{
   res.json({success:true,user:req.user})
    });
   server.post('/register',(req,res)=>{
    User.findOne( {
        email :req.body.email, 
       },(err,user)=>{
           console.log(user);
       if (user) {
         res.json({success:false});
       } else {
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.fullName = req.body.fullname;
        newUser.save(function(err,user){
            if (err) {
                return res.json({"success": false, err: err })
            }
            res.json({"success":true,"user":user})
       });

    
}
});
   })}
