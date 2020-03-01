const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

 mongoose.connect("DataInfo" , {
     useNewUrlParser: true ,
     useCreateIndex:true ,
     useUnifiedTopology:true ,
     useFindAndModify:false
 })
const app = express();

app.use(cookieParser("test"));
app.use(bodyParser.json());
app.use(morgan("dev"));
 
require("./routes/userRoutes")(app);

const PORT = 5000;

app.listen(PORT , ()=> {

    console.log("server is up");
});