
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// valid date returns json object w/unix + utc key
app.get("/api/:date", (req, res) => {
  const seconds = req.params.date
  const date = new Date(req.params.date)

if (date != "Invalid Date") {
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
} else if (!isNaN(seconds)) {
  return res.json({ unix: parseInt(seconds), utc: new Date(parseInt(seconds)).toUTCString() })
} else {
  res.json({ error: "Invalid Date" })
}
})

// empty date parameter returns current time in JSON object
app.get('/api', (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() })
})

 const listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});


