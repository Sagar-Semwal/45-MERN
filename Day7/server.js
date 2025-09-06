const express = require('express');
const app = express();

app.get('/api', (request, res) => {
    res.json({ message: "API is running" });
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})