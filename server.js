const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express()
const path = require('path');

app.use(cors())

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))

app.get('/coins', (req, res) =>{
    const limit = req.query.limit;
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coins?limit=${limit}`,
        headers:{
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/exchange', (req, res) =>{
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/exchanges`,
        headers:{
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/coin', (req, res) =>{
    // console.log("Coin called");
    const id = req.query.id;
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
        headers:{
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/history', (req, res) =>{
    const id = req.query.id;
    const time = req.query.time;
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${id}/history/${time}`,
        headers:{
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/cnews', (req, res) =>{
    const count = req.query.count;
    const newsCategory = req.query.q;
    const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        headers:{
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.use(express.static(path.join(__dirname, "build")));

app.get('/crypto/:id', (req, res) =>{
    // console.log("reload coin called")
    var pathArray = req.path.split('/');
    if(isNaN(pathArray[2]))
    res.json(`${req.path} Page does not Exist`);
    else 
    res.sendFile(path.join(__dirname, "build", "index.html"));
})
app.get('/exchanges', (req, res) =>{
        res.sendFile(path.join(__dirname, "build", "index.html"));
})
app.get('/cryptocurrencies', (req, res) =>{
        res.sendFile(path.join(__dirname, "build", "index.html"));
})
app.get('/news', (req, res) =>{
        res.sendFile(path.join(__dirname, "build", "index.html"));
})

if(process.env.NODE_ENV === 'production')
{
    app.use((req, res, next) => {
        res.json("Page does not Exist");
    });
}