var mysql = require('promise-mysql');
var config = require('./config');

var pool =  mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: 'usermanagement'
});


pool.query('Select 1 + 1 as Solution')
    .then(function (response) {
        console.log('usermanagement is connected');
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = pool;