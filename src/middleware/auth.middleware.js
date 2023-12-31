const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../startup/config')
const settingsModel = require('../models/settings.model')

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'ro\'yhatdan o\'tmagansiz!');
            }

            const token = authHeader.replace(bearer, '');

            // Verify Token
            const decoded = jwt.verify(token, secret_jwt);
            const user = await UserModel.findOne({where:{ id: decoded.user_id }});

            if (!user) {
                throw new HttpException(402, 'Autentifikatsiya amalga oshmadi!');
            }

            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == user.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
                throw new HttpException(403, 'Unauthorized');
            }

            // Dastur amal qilish muddatini tekshirishd
            const checkExpiredApp = await settingsModel.findAll({
                order: [['id', 'DESC']],
                limit: 1
            })
            let currentDay = new Date().toISOString().split("T")[0]
            let appDate = new Date(checkExpiredApp[0].date2 * 1000).toISOString().split("T")[0]
            if(currentDay > appDate) {
                throw new HttpException(412, 'App expired');
            }
            
            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;