const User = require('../models/userModel');
const bycrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Authcontrol{
static async Register(req , res) {
    try {
        const userData= req.body;
        const hashedPass = await bycrypt.hash(userData.pass, 10);
        userData.pass = hashedPass;
        const newUser  = await User.createUser(userData);
        if(!newUser){
            return res.status(400).json({message : "Bad Request , not able to create a user "});
        }
        res.status(200).json({message : "New User created successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server error "});
    }
}

static async login(req ,res){
    try{
        const {email , pass} = req.body;
        const response = await User.findEmail(email);
        if(!response){
            return res.status(400).json("Invalid Email");
        }
        const isMatch = await bycrypt.compare(pass , response.pass);
        if(!isMatch){
            return res.status(400).json({message : "Invalid pass"}); 
        }

        const token = jwt.sign({id : response.id , role_id : response.role_id} ,
             process.env.S_key, 
             {expiresIn : "1h" } );


        res.status(200).json({message : `hello ${response.name} you have successfully logged in as` , 
            token : token});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Internal Server Error"});
    }
}

}

module.exports = Authcontrol;