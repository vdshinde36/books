/**
 * @file Config.js
 * @todo use conditional logic for getting dev vs prod env config object in production 
 */



 const config = {
     MONGO_URI : 'mongodb+srv://devloper:atc9dpfoxtrot@cluster0.xrbil.gcp.mongodb.net/books?retryWrites=true&w=majority',
     PORT : 7000,
     SECRETE : 'atc9dpfoxtrot'
 }

 module.exports = config;