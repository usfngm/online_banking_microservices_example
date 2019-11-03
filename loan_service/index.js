'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// Create the express app
const app = express()

app.use(bodyParser.json());
app.use(cors({ origin: true })); // << for what you just defined



app.post('/', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log('username = ' + username);
  console.log('password = ' + password);
  setTimeout(() => {
    if (username == 'admin' && password == 'admin') {
      var result = {
        'result': 'SUCCESS'
      };
      res.status(200).send(result);
    }
    else {
      var result = {
        'result': 'FAIL'
      };
      res.status(200).send(result);
    }
  }, 1000);
});

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send()
})
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err)
  res.status(500).send()
})



// Start server
app.listen(3001, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:3001')
})
