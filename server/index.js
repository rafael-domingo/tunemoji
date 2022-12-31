const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const path = require('path');
const openai = require('./openai');

app.use('/openai', openai);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})