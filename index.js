// This file should set up the server, middleware and route handling
// This will be an entry point 
// We should set up routes for various functionalities like authentication, mood entry, journaling and reporting

import express from 'express';

const app = express();

app.use(express.static('public'))
app.use(express.json())

const PORT = process.env.PORT || 4011;
app.listen(PORT, function () {
    console.log(`Server started http://localhost:${PORT}`);
})