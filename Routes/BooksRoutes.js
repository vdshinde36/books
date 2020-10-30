/**
 * @file Books.routes.js
 * @description file for handling routes related to books */


const express = require("express");
const router=express.Router();

const { insertBooks,
        getbooksByAuthors,
        getBookByDate, 
        getBookByCost, 
        getAvgCost,
        deleteBook,
        updateAndIncrement 
      } = require('../Controller');

router.post('/book/save', insertBooks);

router.get('/book/getbooksByAuthors', getbooksByAuthors ) 

router.get('/book/getbooksByCost', getbooksByCost)

router.get('/book/getbooksByDate', getbooksByDate);

router.get('/book/getAvgCost', getAvgCost)

router.delete('/book/:title', deleteBook)

router.put('book/:category', updateAndIncrement)
 
 


module.exports=router;