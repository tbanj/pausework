const http = require('http');
const path = require('path')
const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 3000; 
const app = express();
const server = http.createServer(app);



if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(__dirname, '../public')));
} else {
    app.use(express.static(path.join(__dirname, '../build')));
}



app.get('/', (req, res) => {
    if (process.env.NODE_ENV !== "production") {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    }
});
app.get('/holidays', (req, res) => {
    const BASE_URL = 'https://holidayapi.com/v1/holidays';
    const params = {
        country: 'NG',
        key: '9b890f5f-3306-4b9a-a6a4-bad7bc6abd9d',
        day: '20',
        month: '05',
        year: '2018'
    }
    axios.get(BASE_URL, { params })
        .then(response => {
            res.json(response.data);
        }, error => {
            res.status(400)
            res.json({ message: error.message })
        });
});

server.listen(port, () => {
    console.log(`Server is listening for connection on ${port}`);
    console.log(process.env.NODE_ENV);
    
});