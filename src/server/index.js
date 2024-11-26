var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express()

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'))
//app.use(express.static('src/client'))


console.log(__dirname)

//variable for url and api key
const webURL = 'https://api.meaningcloud.com/sentiment-2.1?';
const apiKey = process.env.APPLICATION_KEY;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// POST Route
app.post('/api', async function (req, res) {
    try {
        const userInput = req.body.url;
        console.log(`Received URL: ${userInput}`);
        const api = `${webURL}key=${apiKey}&url=${userInput}&lang=en`;
        
        
        if (!userInput) {
            res.status(400).send({ error: 'Invalid URL provided.' });
            return;
        }

        const response = await fetch(api);
        const mcData = await response.json();
        console.log(mcData);
        res.status(200).send(mcData); // send data to clint
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Error processing the request.' });
    }
});


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


