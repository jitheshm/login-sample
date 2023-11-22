const dbData = require('../data.json')
const bcrypt = require('bcrypt');

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            if (data.User === dbData.User) {
                bcrypt.compare(data.Password, dbData.Password).then((result) => {
                    if (result) {
                        // console.log("result"+result);
                        resolve({ "msg": "Success","status":true })
                    }
                    else {
                        resolve({ "msg": "User name or password is incorrect","status":false})
                    }
                })
            } else {
                resolve({ "msg": "User name or password is incorrect","status":false })
            }
        })
    }
}