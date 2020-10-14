const db = require('../connection');
const config = require('../config');
const httpStatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const authHelper = require('./authhelper');
const xlsxFile = require('read-excel-file/node');
const { use } = require('../server');

module.exports.signIn = function (req) {
    return new Promise(async function (resolve, reject) {
        try {
            let checkUser = await db.query('select * from users where email = ?', [req.body.email]);
            if (checkUser && checkUser.length) {
                let token = await generateToken(checkUser[0]);
                return resolve({ status: httpStatusCode.OK, data: { message: 'Login Successfully', userdata: checkUser[0], token: token } })
            } else {
                return resolve({ status: httpStatusCode.BAD_REQUEST, data: { message: 'Invalid Email or Password' } })
            }
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports.updateUser = function (req) {
    return new Promise(async function (resolve, reject) {
        try {
            let validateToken = await authHelper.verifyToken(req);
            if(validateToken && validateToken.status == httpStatusCode.OK) {
                        if (req.body.firstname && req.body.lastname
                        && req.body.gender && req.body.email
                        && req.body.mobileNo && req.body.password
                        && req.body.address && req.body.city) {
                           
                            let item = {
                                'firstname': req.body.firstname,
                                'lastname': req.body.lastname,
                                'gender': req.body.gender,
                                'email': req.body.email,
                                'mobileNo': req.body.mobileNo,
                                'password': req.body.password,
                                'address': req.body.address,
                                'city': req.body.city
                            }
                            let isUpdated = await db.query('update users set firstname = "' + item.firstname + '",lastname = "' + item.lastname + '", gender = "' + item.gender + '", address = "' + item.address + '", mobileNo = "' + item.mobileNo + '", city = "' + item.city + '" where email = "' + item.email + '"');
                            if (isUpdated) {
                                return resolve({ status: httpStatusCode.OK, data: 'User Updated' });
                            }
                        
                        } else {
                            return resolve({ status: httpStatusCode.BAD_REQUEST, data: 'Please Pass Missing Data' });
                        }
             }
             else {
                return resolve({ status: httpStatusCode.UNAUTHORIZED, data: 'Token Invalid or Token Expired' })
            }  
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports.register = function (req) {
    return new Promise(async function (resolve, reject) {
        try {
                        if (req.body.firstname && req.body.lastname
                        && req.body.gender && req.body.email
                        && req.body.mobileNo && req.body.password
                        && req.body.address && req.body.city) {
                            let checkUser = await db.query('select * from users where email = ?', [req.body.email]);
                            if(checkUser.length < 1){
                            let item = {
                                'firstname': req.body.firstname,
                                'lastname': req.body.lastname,
                                'gender': req.body.gender,
                                'email': req.body.email,
                                'mobileNo': req.body.mobileNo,
                                'password': req.body.password,
                                'address': req.body.address,
                                'city': req.body.city
                            }
                            let isInserted = await db.query('insert into users set ?', [item]);
                            if (isInserted) {
                                return resolve({ status: httpStatusCode.OK, data: item });
                            }
                        }
                        else{
                            return resolve({ status: httpStatusCode.OK, data: 'User Already Exist' });
                        }
                        } else {
                            return resolve({ status: httpStatusCode.BAD_REQUEST, data: 'Please Pass Missing Data' });
                        }
                  
        } catch (error) {
            return reject(error)
        }
    })
}

function generateToken(data) {
    return new Promise(function (resolve, reject) {
        try {
            let privateKey = config.privateKey;
            let token = jwt.sign({ data: data.email }, privateKey, { expiresIn: '24h' });
            return resolve(token);
        } catch (error) {
            return reject(error);
        }
    })
}
