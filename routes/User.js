const express = require("express")
const bcrypt = require("bcrypt")
const mysql = require("mysql")
const router = express.Router()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "user"
})
router.post('/user', (req, res) => {
    let password = ''
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            password = hash
            db.query("INSERT INTO user VALUES (?,?)", [req.body.username, password],
                function(err, result) { res.status(200).json({ status: "account created", a: result }) }
            )
        }
    })
})

router.post('/user/auth', (req, res) => {
    let password = ''
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            password = hash
            db.query("SELECT password,userId from user where username = (?)", [req.body.username], (err, result) => {
                // if (password === result.password) res.status(200).json({ status: "success", userID: result.userID })
                // else res.status(401).json({ status: err })
                res.status(200).json({ status: result })
            })
        }
    })
})

module.exports = router
