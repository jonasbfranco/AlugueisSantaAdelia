const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// DB Connecetion
const conn = require("./db/conn")
conn();

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Servidor online na porta ${port}`);
})


