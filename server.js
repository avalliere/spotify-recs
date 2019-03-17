const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const request = require('request')

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/spotifyToken', (req, res) => {
    res.header('Access-Contro-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' +
            new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        console.log('response body', body)
        if (!error && response.statusCode === 200) {
          res.json({ token: body.access_token })
        }
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`));