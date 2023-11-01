const express = require('express');
const { doSomeHeavyTask } = require('./utils');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get('/', (req, res) => {
    return res.json({ Message: `Hello From express!` });
});

app.get('/slow', async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy task took ${timeTaken} seconds`
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            error: "Internal Server Error"
        })
    }
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})