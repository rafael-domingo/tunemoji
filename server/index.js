const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const path = require('path');
const openai = require('./openai');
const spotify = require('./spotify');

app.use('/openai', openai);
app.use('/spotify/', spotify);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})