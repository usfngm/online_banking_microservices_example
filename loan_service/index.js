'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// Create the express app
const app = express()

app.use(bodyParser.json());
app.use(cors({ origin: true }));



app.post('/', (req, res) => {
  var amount = parseInt(req.body.amount);
  var years = parseInt(req.body.years);
  console.log('amount = ' + amount);
  console.log('years = ' + years);
  setTimeout(() => {
    if (years == 0) {
      setTimeout(function () {
        throw new Error('INVALID DIVISION');
      }, 10);
      res.status(500).send();
    }
    else {
      var total = amount * 1.25;
      var monthly = total / (years*12);
      var result = {
        'monthly': Math.ceil(monthly),
        'total': Math.ceil(total)
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
app.listen(3002, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:3002')
})
