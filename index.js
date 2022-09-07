const express = require('express');
const database = require('./database');

const app = express();

app.use(express.static('public'));

app.get('/api/get', function (req, res, next) {
    const key = req.query.key;
    return database
        .get(key)
        .then(function (value) {
            if (value === null) return res.status(404).json({ error: `Key "${key}" not found` });
            return res.json({ value: value });
        })
        .catch(function (error) {
            return res.status(error.status || 500).json({ error: error.message });
        });
});

// Q: Why do I need a express.json() here and not in .get?
app.post('/api/set', express.json(), function (req, res, next) {
    const key = req.body.key;
    const value = req.body.value;
    return database
        .set(key, value)
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            return res.status(error.status || 500).json({ error: error.message });
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
