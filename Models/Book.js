/**
 * @file Book.js
 * @author Vaibhav
 * @description This file create Model for Book Schema
 */

const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({

    title : {
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35
    },
    publication : {
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true
    },
    
    authors : [ String ], // we  can later spertae these into AuthorsSchema for saving space

    category : {
        type:String,
        trim:true, // remove space from end & an begining if have
    },

    publishedAt : {
        type : Number
    },

    cost : {
        type : Number
    },

    isBestSeller : {
        type : Boolean,
        default : false
    }

},{timestamps:true}); // add createdAt and updatedAt fields



module.exports= mongoose.model("Book",BookSchema);