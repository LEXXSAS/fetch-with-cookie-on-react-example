const mysql = require('mysql');
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.YOUR_HOST,
  user: process.env.YOUR_USER,
  password: process.env.YOUR_PASSWORD,
  database: process.env.YOUR_DATABASE
});

const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

const PORT = 8888;

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser());

function mw(req, res, next){
  try {
    const {username} = req.cookies;
    try {
      if (username === 'John') {
        next()
      } else {
        res.status(500).json('you are not authorized or token is not valid');
      }
    } catch (error) {
      res.status(500).json('something went wrong');
    }
  } catch (error) {
    res.status(500).json('you are not authorized or token is not valid');
  }
}

app.get('/users', mw, (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  })
})

app.post('/login', (req, res) => {
  try {
    const {username} = req.body;
    try {
      if (username === 'John') {
        res.cookie('username', username, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.status(200).json('authorized successfully');
      } else {
        res.status(403).json('username incorrect')
      }
    } catch (error) {
      res.status(403).json('authorized failed')
    }
  } catch (error) {
    res.status(500).json('something went wrong')
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('username', {httpOnly: true});
  res.status(200).json('logout successfully');
})

app.listen(PORT, () => {
  console.log(`Connection active on port ${PORT}`)
})
