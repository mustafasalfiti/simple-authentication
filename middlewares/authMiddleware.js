const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async(req ,res , next) => {
    try{
        const token = req.signedCookies["x-access"] || undefined;
        const { username , _id} = jwt.verify(token ,"test12345");
        let user = await User.findOne({username , _id});
        if(user) {
            req.user = user;
            next();
        } else {
            throw err;
        }
    } catch(err) {
        res.status(200).send("Not Logged");
    
    }



}