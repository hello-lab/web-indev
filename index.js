
const express = require('express');
const cors = require('cors');


const path = require('path')
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());




app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home.html'));
});

app.get('/home1', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home1.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/projects.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/resources.html'));
});

app.get('/getinvolved', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/getinvolved.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
