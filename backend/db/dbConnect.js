const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Niraj123@",
    database: "postapp"
});
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log(`database connection established successfully!!`);
    }
});
module.exports = connection;
