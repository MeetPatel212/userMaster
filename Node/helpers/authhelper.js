const db = require('../connection');
const config = require('../config');
const httpStatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (req) {
    return new Promise(function (resolve, reject) {
        try {
            if (req.body.token) {
                let token = req.body.token
                let decoded = jwt.verify(token, config.privateKey);
                if(decoded && decoded.data) {
                    return resolve({status: httpStatusCode.OK, data: decoded})
                } else {
                    return resolve({status: httpStatusCode.UNAUTHORIZED, data: 'Invalid Token'})
                }
            } else {
                return resolve({status: httpStatusCode.BAD_REQUEST, data: 'Please Pass Token'})
            }
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports.validateRole = function (email) {
    return new Promise(async function (resolve, reject) {
        try {
            if (email) {
                let getRole = await db.query('SELECT t1.id,t1.email,t1.roleid,t2.role FROM users t1 \
                INNER JOIN role t2 ON t2.id = t1.roleid \
                WHERE t1.email = ?', [email]);
                if(getRole && getRole.length) {
                    return resolve({status: httpStatusCode.OK, data: getRole[0]})
                } else {
                    return resolve({status: httpStatusCode.BAD_REQUEST, data: 'Not Found'})
                }
            } else {
                return resolve({status: httpStatusCode.BAD_REQUEST, data: 'Not Found'})
            }
        } catch (error) {
            return reject(error);
        }
    })
}