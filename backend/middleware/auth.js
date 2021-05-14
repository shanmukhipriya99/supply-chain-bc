const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require("dotenv").config({ path: "./config/.env"});
 
const auth = async (req, res,next) =>{
    try {
    const token = req.header("Authorization").replace("Bearer ", "");
    	 if (token) {
		// verify secret and checks exp
		const decoded = await jwt.verify(token, process.env.JWT);
			if (decoded) {
                next();
            }
         }    
    }catch (err) {
                res.status(401).send({ err: "Invalid Access"});
    };
	    }

module.exports = auth;