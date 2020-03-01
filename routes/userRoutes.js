const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (app) => {
    app.get('/auth/users' , async(req , res)=> {
        const users = await User.find({});
        res.status(200).json(users);
    });

    app.post('/auth/users' , async (req , res)=> {
        const {username , password} = req.body;
        try {
            const user = new User({
                username,
            });
            user.password = user.hashPassword(password);
            user.save();
            res.status(200).send(user);

        } catch(err) {
            res.status(400).json(err)

        }

    });


    app.post('/auth/login' , async(req , res)=> {
        const { username , password } = req.body;
        try {
            const user = await User.findOne({username});
            if(user.comparePassword(password)) {
                const token = user.setToken();
                res.status(200).cookie("x-access" , token , {
                   maxAge:1000*60*60*24*15 ,
                   httpOnly:true ,
                   signed:true
                }).send("Logged In")
            } else {
                throw error;
            }
        } catch(err) {
            console.log(err);
            res.status(400).send(err);
        }

    });

    app.get('/auth/logout', authMiddleware ,(req , res)=> {
        req.user = null;
        res.clearCookie("x-access");
        res.status(200).send("logged out");
    })

    app.get("/api/me" , authMiddleware , (req , res)=> {
        res.status(200).send(req.user);

    })

}