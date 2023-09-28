const db = require('../db/dbConnect');
const util = require('../utils/utils');
const jwt = require('jsonwebtoken');

const getAllPosts = (req, res) => {
    const statement = req.query.category ? `select * from  posts where category = ?` : `select * from  posts`;
    db.query(statement, [req.query.category], (err, result) => {
        res.send(util.createResult(err, result));
    });
};
const getSinglePost = (req, res) => {
    const { pid } = req.params;
    const statement = `select p.title,p.description,p.category,p.img,u.uid,u.username,u.profile from posts p join user u on p.uid = u.uid where p.pid = ?`;
    db.query(statement, [pid], (err, result) => {
        res.send(util.createResult(err, result));
    });
};
const addPost = (req, res) => {
    const { title, description, uid, createdAt, category } = req.body;
    const { fileName } = req.file;
    const statement1 = `insert into posts(title,description,img,uid, createdAt,category) values(?,?,?,?,?,?)`;
    db.query(statement1, [title, description, fileName, uid, createdAt, category], (err, result) => {
        res.send(util.createResult(err, result));
    });
};
const updatePost = (req, res) => {
    const { title, description } = req.body;
    const { pid } = req.params;
    const { fileName } = req.file;
    const statement1 = `update posts set title = ?, description = ?, img = ? where pid = ?`;
    db.query(statement1, [title, description, fileName, pid], (err, result) => {
        res.send(util.createResult(err, result));
    });
};
const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.send(util.createResult(err, "Not Authenticated!"));
    }
    //here user = payload which contains id and username from auth.js
    jwt.verify(token, "jwtkey", (err, user) => {
        if (err) {
            res.send(util.createResult(err, "Token is not valid!"));
        }
        else {
            const { pid } = req.params;
            const statement1 = `delete from posts where pid = ? and uid = ?`;
            db.query(statement1, [pid, user.id], (err, result) => {
                res.send(util.createResult(err, result));
            });
        }
    });

};
module.exports = { getAllPosts, getSinglePost, addPost, updatePost, deletePost };
