const { Schema , model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    username:String ,
    password:String ,
    posts: [{type:Schema.Types.ObjectId , ref:"Post"}],
    token:String

});

userSchema.methods.setToken = function() {
     let token = jwt.sign({_id:this._id , username:this.username} ,
        "test12345");
    this.token = token;
    return token;

};

userSchema.methods.hashPassword = (password)=> {
    return bcrypt.hashSync(password , 10);
}

userSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password , this.password);
}

module.exports = model('User' , userSchema);