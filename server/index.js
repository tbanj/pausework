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


// params for https://holidayapi.com/
const params = {
    country: 'NG',
    key: '9b890f5f-3306-4b9a-a6a4-bad7bc6abd9d',
    day: '20',
    month: '05',
    year: '2018'
}

// params for https://calendarific.com
const param = {
    country: 'NG',
    key: '3aea719b9e3eb0ba8c1950cc17e66f8b3bc80d1b',
    year: '2019'
}


app.get('/holidays', (req, res) => {
    const BASE_URL = `https://calendarific.com/api/v2/holidays?country=${param.country}&year=${param.year}&api_key=${param.key}`;
    
    axios.get(BASE_URL)
        .then(response => {
            var checkAll = response.data;
            // const checkSunday = checkAll.
            const keys = Object.keys(response.data);
          const valueRates = Object.values(response.data);
          const keyRate = keys.findIndex(number => number === 'response');
          const valueRateInner = Object.values(valueRates[keyRate]);
          const valueRateInn= Object.values(valueRateInner);
          const valueRateIn= Object.values(valueRateInn);
        //   const keyRate1 = valueRateInner.findIndex(number => number === 4);
          const keyRate1 =valueRateInn.filter(number => number ==="New Year's Day");
         
          console.log(valueRateIn);
        
          
            res.json(response.data);
        }, error => {
            res.status(400)
            res.json({ message: error.message })
        });
});


app.get('/holidaystwo', (req, res) => {
    const BASE_URL = `https://holidayapi.com/v1/holidays?key=${params.key}&country=${params.country}&year=${params.year}&month=${params.month}&day=${params.day}&previous=true`;
    
    axios.get(BASE_URL)
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
    console.log(params);
    
});