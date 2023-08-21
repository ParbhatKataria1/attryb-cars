const jwt = require('jsonwebtoken');
const auth_middleware = (req, res, next)=>{
    try {
        const {token = ""} = req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).send({error:'jwt token in not correct'});
        }
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(decoded.username){
                res.user = {username:decoded.username, email:decoded.email, _id:decoded._id};
                next();
            }else {
                return res.status(401).send({error:'jwt token in not correct'});
            }
        })
        
    } catch (error) {
        return res.status(500).send({error:'internal server error'});
    }
}

module.exports = {auth_middleware}