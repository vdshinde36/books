/**
 * @file Book controller js
 */




// require models for constroller

const { Book } = require('../Models');


/**
 * insert Books in database 
 * @param {Object} req  | express object
 * @param {Object} res  | exress object
 */

const insertBooks = async (req,res) => {

    let book = new Book({...req.body});
    try{
        let status = await book.save();
        console.log(status);
        if(status){
            res.status(201).json({status}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'FAILED_TO_POST'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'FAILED_TO_POST'}})
    }
}



/**
 * get Books using by authors e.g httP://server-url/api/getBooksByAuthors?authors=jkrowling&authors=abc
 * @param {Object} req 
 * @param {Object} res 
 */
const getBooksByAuthors = async (req, res) => {
    
    let { author } = req.query;
    try{
        let books = await Book.find({authors: {$in : author }});

        if(books.length !== 0){
            res.status(200).json({status:true , payload : books}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'NO_BOOK_FOUND'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // general error
    }
    
}

/**
 * get books bettween date liek get all books between 2018-2020
 * 
 * use query string to send date between like ?start=2018&end=2020
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const getBooksByDate = async (req, res) => {
    
    let { start, end  } = req.query;
    try{
        let books = await Book.find({ publishedAt: {$gte : start , $lt : end }}).exec();

        if(books.length !== 0) {
            res.status(200).json({status:true , payload : books}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'NO_BOOK_FOUND'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // general error
    }
    
}


/**
 * get books bettween cost
 * 
 * use query string to send date between like ?mincost=500& max cost=1000
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const getBooksByCost = async (req, res) => {
    
    let { mincost, maxcost  } = req.query;
    try{
        let books = await Book.find({ cost : { $lte : mincost , $gte :maxcost }}).exec();

        if(books.length !== 0) {
            res.status(200).json({status:true , payload : books}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'NO_BOOK_FOUND'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // general error
    }
    
}



/**
 * get average cost of books
 * 
 * use query string to send date between like ?mincost=500& max cost=1000
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const getAvgCost = async (req, res) => {

    try{
        // aggregation pipeline for avg
        let avg = await Book.aggregate([
            {
                "$group": {
                    "_id": null, // used for no group
                    "average": { "$avg": "$cost" }
                }
            }
        ]).exec();

      return res.status(200).json({status:true , payload : avg}); // resouce sucessfull created
        
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // general error server error
    }
    
}




/**
 * delete  book finction uaing title
 * @param {Object} req 
 * @param {Object} res 
 */
const deleteBook = async (req,res) => {

    let { title } = req.params;
    try{
        let status = await Book.deleteOne({title : title}).exec();
        console.log(status);
        if(status){
            res.status(200).json({status}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'FAILED_TO_DELETE'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // general server error
    }
}




/**
 * update books of fiction category and incremtn cost 100
 * @param {Object} req 
 * @param {Object} res 
 */
const deleteBook = async (req,res) => {

    let { category } = req.params;
    try{
        let status = await Book.updateMany({category : category} , {$inc : {'cost' : 100}}).exec();
        console.log(status);
        if(status){
            res.status(200).json({status}); // resouce sucessfull created
        }else{
            res.json({err:{errorCode:'FAILED_TO_UPdate'}});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:{errorCode:'GEN_ERR'}}) // gerneral server error
    }
}


 

/**
 * exporting to index js files
 * @todo add logic to index js file to automatically impoert file from cureent cwd
 */ 
module.exports.insertBooks = insertBooks;
module.exports.getBooksByAuthors = getBooksByAuthors;
module.exports.getBooksByDate = getBooksByDate;
module.exports.getBooksByCost = getBooksByCost;
module.exports.getAvgCost = getAvgCost;
module.exports.deleteBook = deleteBook;

