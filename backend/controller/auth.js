const db = require('../db/dbConnect');
const util = require('../utils/utils');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const register = (req, res) => {
    const statement1 = `select * from user where email = ? and password = ?`;
    const { email, password } = req.body;
    const encryptedPassword = String(cryptoJs.SHA256(password));
    db.query(statement1, [email, encryptedPassword], (err, result) => {
        //first check whether the user exists in the db
        if (result.length) {
            res.send(util.createResult(err, "User already exists"));
        } else {
            const { username, email, password } = req.body;
            const encryptedPassword = String(cryptoJs.SHA256(password));
            const statement2 = `insert into user(username,email,password,profile) values(?,?,?,?)`;
            db.query(statement2, [username, email, encryptedPassword, "user.jpg"], (err, result) => {
                res.send(util.createResult(err, result));
            });
        }
    });
};
const login = (req, res) => {
    const statement1 = `select * from user where email = ? and password = ?`;
    const { email, password } = req.body;
    const encryptedPassword = String(cryptoJs.SHA256(password));
    db.query(statement1, [email, encryptedPassword], (err, result) => {
        //if the user does not exist in the db
        if (result.length === 0) {
            res.send(util.createResult(err, "User does not exists"));
        } else {
            //if the user exists in the db
            const user = result[0];
            const payload = {
                id: user.uid,
                username: user.username
            };
            const token = jwt.sign(payload, "jwtkey");
            res.cookies("access_token", token, {
                httpOnly: true
            }).send(util.createResult(null, {
                uid: `${user.uid}`,
                email: `${user.email}`,
                username: `${user.username}`,
                profile: `${user.profile}`,
                token: token
            }));
        }
    });
};
const logout = (req, res) => {

};
module.exports = { register, login, logout };
