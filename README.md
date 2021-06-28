# Computeron Final Project

## Overview

Computeron is a program that uses React.js, Express.js, and MongoDB to create a full-stack web application. The goal of this project was to create a simple full-stack application. The desired audience is meant for people who want to learn more about personal computers. This website implements user-interaction to give information about hardware that make up a personal desktop computer. A MongoDB cluster is used to keep track of user login information. This allows users to login to an existing account and keep a basic list of computer parts that they want to log for a potential build that they have.

`Notice:` I do not recommend creating accounts with re-used passwords or personal information as accounts are only secured with SHA-256 hashes.

## Tools Used

* [Node.js](https://nodejs.org/en/)
* [React JS](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Twitter for Node.js](https://www.npmjs.com/package/twitter)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Instructions to Run the Application

`Notice:` Pulling from this repository alone will not be enough to run this application locally. Private keys and tokens were placed in a `.env` file to protect personal Twitter API keys and the MongoDB cluster information. The application is available online in the next [section](https://github.com/MattRoumo27/Computeron#links-to-the-deployed-applications)

## Links to the Deployed Applications  

This section will contain the link to the app that has been deployed on Heroku.

* [Computeron](https://computeron-frontend.herokuapp.com/)

## MongoDB Implementation

The React frontend communicates with the Express Backend. The Express Backend stays in touch with the MongoDB database that has been set up for the project, where the data for user created accounts on computeron is stored.

The Schema for this database is located in [Data.js](https://github.com/MattRoumo27/Computeron/blob/master/FinalProjectImplementation/backend/schema/Data.js) in the backend application.

```javascript
const DataSchema = new Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        partsLogged: Array
    }
);
```

## Twitter API

The Computeron application implements a Twitter API client for the required API portion of the project. It is used to fetch tweets that are associated with the query, `Computer parts`. Then the urls for these tweets are put together to form iframes at the bottom of the page to give a look at the tweet from the Computeron website. The Twitter API uses can be seen in [computeron.js](https://github.com/MattRoumo27/Computeron/blob/master/FinalProjectImplementation/backend/routes/computeron.js) and [showTweets.js](https://github.com/MattRoumo27/Computeron/blob/master/FinalProjectImplementation/frontend/src/components/showTweets.js).

## License

Copyright © 2021 [Matt Roumeliotis](https://github.com/MattRoumo27)  
This project is [MIT](https://github.com/MattRoumo27/Computeron/blob/master/LICENSE) licensed
