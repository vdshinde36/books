/**
 * @file server.js
 * @author Vaibhav D Shinde
 * @description This file initilize all and load all dependency and start Http Server
 * @TODO later on do sperate server and express app file 
 * for and use loaders for initialize
 * 
 */


 /**
 * @file server.js
 * @note remove all console.log and try to use advance logging like winston with http tarnspoert for prod
 */



const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const config = require('./config/config');
const querystring = require('querystring');



// Routes
const bookRoute = require('./Routes/BooksRoutes');


// app
const app = express();

// db
mongoose
    .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    })
    .then(() => console.log(`[DB][DB Connected.........]`))
    .catch(err => { console.log('[DB] [DB error]')});


// middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 



// routes
app.use('/api',bookRoute);






const port = config.PORT || 7000;

console.log(`[process.env][${process.env.toString()}]`);
  
app.listen(port, () => console.log(`[Server][Server running on port ${port}]`));