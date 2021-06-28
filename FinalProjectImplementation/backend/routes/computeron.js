var express = require('express')
var router = express.Router();
var Twitter = require('twitter')
const mongoose = require('mongoose');
const Data = require('../schema/Data');
const dotenv = require('dotenv');

dotenv.config();

const dbRoute = process.env.DB_ROUTE;

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

/* Checks if conection with the database is successful */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Set up the Twitter API client */
var twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

/* Listen for get requests from the React frontend and send a tweet query with the client */
router.get('/api/tweets/:query/', function(request, response) {
    let searchParam = { q: request.params.query, count: 10, lang: 'en' };
    twitterClient.get('search/tweets', searchParam, function(error, data, tweetResponse) {
        if (error) {
            console.error("Tweet did not work");
            response.json({ success: false, info: "Tweet did not work"});
        } else {
            let tweetData = data.statuses;
            response.json({ success: true, info: tweetData });
        }
    })
});

/* Gets all of the data in the MongoDB database */
router.get('/computeron/', function(request, response, next) {
    Data.find(function (error, data) {
        if (error) {
            return response.json({ success: false, error: error });
        }
        return response.json({ success: true, info: data });
    });
});

/* Post a new account on the MongoDB database */
router.post('/computeron/', function(request, response, next) {
    let newData = new Data();
    newData.name = request.body.name;
    newData.email = request.body.email;
    newData.username = request.body.username;
    newData.password = request.body.password;

    /* First, check to see if this username is already taken */
    Data.findOne({ username: newData.username }, function(error, data) {
        if (error) {
            return response.json( {success: false})
        }
        if (data === null) {
            newData.save((err) => {
                if (err) {
                    return response.json( {success: false, error: err });
                } else {
                    return response.json( {success: true })
                }
            });
        } else {
            return response.json( {success: false, info: null })
        }
    });
});

/* Update the parts log on the database to match what the client is giving us */
router.put('/computeron/partLogger/', function(request, response, next) {
    let username = request.body.username;
    let parts = request.body.partsLogged;
    console.log(username, parts)

    Data.findOneAndUpdate({ username: username }, { partsLogged: parts }, {useFindAndModify: false}, function(error, data) {
        if (error) {
            return response.json({ success: false, error: err });
        }
        return response.json({ success: true, info: data })
    })

})

/* Lookup the username associated with the parts we are trying to find */
router.get('/computeron/partLogger/:username/', function(request, response, next) {
    let username = request.params.username;
    Data.findOne({ username: username }, function(error, account) {
        if (error) {
            return response.json({ success: false, error: error });
        }
        console.log(account.partsLogged)
        return response.json({ success: true, info: account.partsLogged })
    });
});

/* Delete an account from the database */
router.delete('/computeron/', function(request, response, next) {
    let username = request.body.username;
    Data.findOneAndRemove({ username: username }, (error) => {
        if (error) {
            return response.json({ success: false, error: error });
        } else {
            return response.json({ success: true })
        }
    });
});

/* Lookup the account on the MongoDB database to see if it exists */
router.get('/computeron/accountlookup/:username/:password/', function(request, response, next) {
    let username = request.params.username;
    let password = request.params.password;
    console.log(username, password)
    Data.findOne({ username: username, password: password }, function(error, account) {
        if (error) {
            return response.json({ success: false, error: error });
        }
        return response.json({ success: true, info: account });
    });
});

module.exports = router;
