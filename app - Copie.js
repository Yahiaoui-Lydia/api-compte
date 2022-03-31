const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes')
app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => console.log(`listening at port ${port}`))
app.get('/', (req, res) => {
    res.send('Welcome to new API');
  });
  app.use(routes);

