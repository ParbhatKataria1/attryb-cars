const bcrypt = require('bcrypt');
const { UserModel } = require('../model/user.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const sign_controller = async (req, res)=>{
    try {
        const {username = "", email = "", password = ""} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({error:'Please provide necessary credentials'})
        }
        const user = await UserModel.find({email});
        if(user?.length){
            return res.status(409).send({error:'user already exists'})
        }
        bcrypt.hash(password, +process.env.salt_round, async(error, hash)=>{
            if(hash){
                const user = new UserModel({username, password:hash, email});
                await user.save();
                res.status(201).send({msg:'Account is created'})
            }
            else {
                res.send(500).send({error:'internal server error', msg:error.message});
            }
        })
    } catch (error) {
        res.send(500).send({error:'internal server error', msg:error.message});
    }
}

const login_controller = async(req, res)=>{
    try {
        const {email = "", password = ""} = req.body;
        if(!email || !password){
            return res.status(400).send({error:'Please provide necessary credentials'})
        }
        const temp = await UserModel.findOne({email});
        if(!temp?.username){
            return res.status(401).send({error:'Provided credentials are incorrect'});
        }
        const {password:hash = '', username='', _id = ''} = temp;
        bcrypt.compare(password, hash, (error, result)=>{
            if(result){
                const temp = jwt.sign({username, email, _id}, 'masai', {expiresIn:'1d'})
                res.status(200).send({token:`Bearer ${temp}`})
            }else {
                res.status(401).send({error:'credentials provided are not correct', msg:error.message})
            }
        })
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error.message});
    }
}

module.exports = {sign_controller, login_controller};