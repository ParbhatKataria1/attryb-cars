const jwt = require('jsonwebtoken');
const auth_middleware = (req, res, next)=>{
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).send({error:'jwt token in not provided'});
        }
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(decoded.username){
                req.user = {...decoded};
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