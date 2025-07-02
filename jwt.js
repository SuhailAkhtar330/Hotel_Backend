const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req,res,next) => {
    
    //first check authorization or not
    const authorization = req.header.authorization;
    if(!authorization) return  res.status(401).json({error : 'Token not found'});
    
    //extract jwt token from req body
    const token = req.header.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error : "Unauthorized"});
    
    try {
        //verify the jtw token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded;
        next();

    } catch(err) {
        console.error(err);
        res.status(401).json({error : 'Invalid token'});
    }
}


//function to generate JWT token

const generateToken = (userData) => {
    //generate a new token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : 7*1000});
}

module.exports = {jwtAuthMiddleware, generateToken}