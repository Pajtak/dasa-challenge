const User = require('../models/userModel')


function findAll(limit){
    return User.findAll({limit})
}

module.exports = {
    findAll
}