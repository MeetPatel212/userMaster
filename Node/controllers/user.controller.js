var userHelper = require('../helpers/userhelper');

module.exports.signIn = function (req, res, next) {
    userHelper.signIn(req)
        .then(function (resp) {
            return res.status(resp.status).json({data: resp.data});
        })
        .catch(function (err) {
            return res.status(502).json(err);
        })
} 

module.exports.register = function (req, res, next) {
    userHelper.register(req)
        .then(function (resp) {
            return res.status(resp.status).json({data: resp.data});
        })
        .catch(function (err) {
            return res.status(502).json(err);
        })
} 

module.exports.updateUser = function (req, res, next) {
    userHelper.updateUser(req)
        .then(function (resp) {
            return res.status(resp.status).json({data: resp.data});
        })
        .catch(function (err) {
            return res.status(502).json(err);
        })
} 
