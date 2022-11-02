const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 3030;

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
    console.log('listening on port ' + port);
    });
