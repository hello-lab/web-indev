
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(cors());



app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/stuff.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/projects.html'));
});

app.get('/getinvolved', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/getinvolved.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home.html'));
});
app.get('/home1', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home1.html'));
});















app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
