const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test users Route
// @access Public
router.get('/test', (req,res)=>res.json({msg:'Users Works'}));

// @route POST api/users/register
// @desc Register users Route
// @access Public
router.post('/register',(req,res)=>{
User.findOne({email:req.body.email})
    .then(user=>{
       if(user){
        return res.status(400).json({email:'Email já existe!'});
       }else{

           const avatar = gravatar.url(req.body.email,{
           s: '200',
           r: 'pg',
           d: 'mm'
           });

           const newUser = new User({
              name:req.body.name,
              email:req.body.email,
              avatar,
              password:req.body.password
           });

           bcrypt.genSalt(10,(error,salt)=>{
            bcrypt.hash(newUser.password, salt,(error,hash)=>{
                if(error) throw error;
                newUser.password = hash;
                newUser.save()
                    .then(user=>res.json(user))
                    .catch(error=>console.log(error));
            });
           });
       }
    });
});
// @route POST api/users/login
// @desc Login users Route / Return jwt
// @access Public

router.post('/login',(req, res)=>{
    const email= req.body.email;
    const password = req.body.password;

    // Encontrar user pelo email
User.findOne({email})
    .then(user=>{
        // Verifica se o usuario existe
        if(!user){
            return res.status(404).json({email:'Usuário não encontrado!'});
        }

        // Verifica a senha
        bcrypt.compare(password, user.password)
            .then(isMAtch=>{
               if(isMAtch){
                   res.json({msg:'Success'});
               }else{
                   return res.status(400).json({password:'Senha incorreta!'});
               }
            });

    });



});
module.exports = router;