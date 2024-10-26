import express from 'express';
const app = express();
import cors from 'cors';
import axios from 'axios';

const droneConfigServerUrl = 'https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec';
const droneLogServerUrl = 'https://app-tracking.pockethost.io/api/collections/drone_logs/records';

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message : 'Hello World!' });
});

app.get('/configs/:id', async (req, res) => {
    try {
        const { data } = await axios.get(droneConfigServerUrl);
        res.json(data.data[req.params.id]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/configs', async (req, res) => {
    try {
        const { data } = await axios.get(`${droneConfigServerUrl}?filter=(drone_id=65011048)`);
        res.json(data.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/status/:id', async (req, res) => {
    try {
        const { data } = await axios.get(droneConfigServerUrl);
        res.json(data.data[req.params.id].condition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/logs', async (req, res) => {
    try {
        const perPage = parseInt(req.query.perPage) || 500;
        const page = parseInt(req.query.page) || 1;
        const { data } = await axios.get(`${droneLogServerUrl}?filter=(drone_id=65011048)&perPage=${perPage}&page=${page}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/logs', async (req, res) => {
    try {
        const { data } = await axios.post(droneLogServerUrl, { ...req.body });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// app.listen(3000, () => {
//     console.log('App listening on port 3000');
// });