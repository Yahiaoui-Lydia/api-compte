const jwt = require('jsonwebtoken');

const jwtSecret = process.env.KEY
const auth = (req, res, next)=>{
	// recuperer le token du header
	const token = req.header('x-auth-token');

	
	// verifier si le token n'est pas vide si c'est le cas alors retourner un status 401 
	
	if (!token){
		return res.status(401).json({ msg: 'No token'});
	}
//decoder
	try {
		const decoded = jwt.verify(token,jwtSecret);

		req.user = decoded.user;
		
		next();
			
	} catch (err) {
			res.status(401).json({msg: "Token is not valid"});
	}
};
module.exports = {auth}