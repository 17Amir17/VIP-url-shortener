# VryShort URL Shortener

## Table of Contents

- [Deployment](#deployment)
- [Features](#features)
- [How it works](#how-it-works)
  * [How I Shorten URL's](#how-i-shorten)
  * [Analytics](#analytics)
  * [Remote DB](#remote-db)
  * [Automatics Tests with Puppeteer and Jest](#automatics-tests-with-puppeteer-and-jest)
- [Technologies Used](#technologies-used)


## Deployment

The app, both front and back is deployed on [heroku](https://vryshort.herokuapp.com)

## Features

- Ability to shorten URL
- Ability to shorten url with custom path
- Check out analytics such as:
  - Date created
  - Last time clicked
  - Amount of clicks
  - Graph of clicks each day
- Delete unwanted shortened urls
- Persistence and Remote DB - Uses restdb.io to store all data
- Responsive, supports small screens aswell
- Tests with jest-puppeteer - working tests to make sure nothing breaks in development
- Github Actions!
- Frontend bundled with webpack

## How it works

The vision I had for this project was to be able to shorten url's with either a random or custom path, It had to work well, have a cool analytics page, handle all error cases, be responsive and be percistant.

### How I Shorten

There are two ways to shorten URL's

- Generate a random and unique UUID, such as 01208bd86c
- Generate with a custom path
  How do I generate a UUID?
  Using the crypto module I generate a random UUID as follows

```js
function generateRandomID() {
  //Only 5 bytes because I want the end url to be short
  return crypto.randomBytes(5).toString('hex');
}
```

How do I deal with custom paths that already exist?  
The shortened url variable in my databse is labeled as unique, so It is impossible for there to be two of the same path, the user will be met with an iziToast error and a 409 http code.

### Analytics

Analytics are possible because each url created is tracked.  
User creates url -> url is added to cb -> user click url -> clicks and date added to db  
User requests analytics -> server requests analyticsfrom db -> frontend displays analytics with chartJS  
How it looks:  
<img width="496" alt="graph" src="https://user-images.githubusercontent.com/36531255/140482747-8a225958-e36a-4ac0-a60c-c908653082d5.PNG">

### Remote DB

I use heroku to deploy my app however, heroku deletes new files added to the file system after every dynamo restart. This makes the app not percistant, to fix this issue you can use a remote DB in this case I used [restdb.io](https://restdb.io/). It has 50,000 free api requests per day which is way more than I need, and is relativly easy to use.
Usage can be found in api/database/databases.js  
Example of usage:

```js
static getUrls = () => {
  const options = {
    method: 'GET',
    url: DataBase.#baseURL,
    headers: DataBase.#headers,
  };
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
      else resolve(JSON.parse(body));
    });
  });
};
```

### Automatics Tests with Puppeteer and Jest

This was probably the most challenging thing for me in this project, but well worth it.  
Tests are used to test the code written and make sure nothing is broken in the proccess, by checking all the page functionalities.  
On of my tests check if an already existing url gets the 409 error code, it sends the request to create the url and then intercepts the response and extracts the code

```js
let gotCode409 = [false];
page.on('response', (res) => {
  if (res.status() == 409) {
    gotCode409[0] = true;
  }
});
```
I made a total of 7 tests:
* title test - to check if everything is set up correct
* bad input test - I gave bad urls to check if it wouldn't shorten
* check if the shortener works
* check if shortener works with custom path
* check if shorten urls redirects
* check if analytics work
* check if url could be deleted  
The most satisfying thing ever:  
![tests](https://user-images.githubusercontent.com/36531255/140616704-a1191ab9-f65d-4761-92d4-fe7ca211be35.png)  
Take a look at my test running:  
![test](https://user-images.githubusercontent.com/36531255/140478841-0435f520-15c6-49a8-a0c7-aa65c5938e52.gif)

## Technologies Used

I used many technologies in this project:

- JS, CSS, HTML - You can't go wrong with these (except for js and css they are kinda bad... and also html)
- [crypto](https://nodejs.org/api/crypto.html) - for generating UUID
- [chartsjs](https://www.chartjs.org/docs/latest/) - for creating that beautiful chart in the analytics page
- webpack - for bundling my frontend
- [iziToast](https://izitoast.marcelodolza.com/) - Cool UI notifications
- [express](https://expressjs.com/) - backend made easy
- [restdb.io](https://restdb.io/) - remote database
