
/**
 * exporting all controllers from book
 */


const insertBooks  = require('./Book').insertBooks;
const getBooksByAuthors = require('./Book').getBooksByAuthors;
const getBookByDate = require('./Book').getBookByDate;
const getBookByCost = require('./Book').getBookByCost;
const deleteBook = require('./Book').deleteBook;
const updateAndIncremrnt = require('./Book').updateAndIncremrnt; 


module.exports = {
    insertBooks,
    getBooksByAuthors,
    getBookByCost,
    deleteBook,
    updateAndIncremrnt,
    getBookByDate
}