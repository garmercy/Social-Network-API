const { connect, connection } = require('mongoose');

//connect with mongodb file
connect('mongodb://127.0.0.1:27017/socialNet');

module.exports = connection;