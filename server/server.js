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

app.get('/configs/:id', (req, res) => {

    
    const response = axios.get(droneConfigServerUrl).then(data => res.json(data.data.data[req.params.id]));
    const response2 = axios.get(droneConfigServerUrl).then(data => console.log(data.data));
});
app.get('/configs', (req, res) => {

    const response = axios.get(`${droneConfigServerUrl}?filter=(drone_id=65011048)`).then(data => res.json(data.data.data));
    const response2 = axios.get(droneConfigServerUrl).then(data => console.log(data.data));
    // response = axios.get(droneConfigServerUrl).then(data => res.json(data.data.data[req.params.id]));
    // response = axios.get(droneConfigServerUrl).then(data => console.log(data.data));
});

app.get('/status/:id', (req, res) => {

    const response = axios.get(droneConfigServerUrl).then(data => console.log(data.data.data[req.params.id].condition));
});

app.get('/logs', (req, res) => {

    const perPage = parseInt(req.query.perPage) || 500;
    const page = parseInt(req.query.page) || 1;
    const response = axios.get(`${droneLogServerUrl}?filter=(drone_id=65011048)&perPage=500`).then(data => res.json(data.data))
    .catch(error => res.status(500).json({ error: error.message }));
    const response2 = axios.get(`${droneLogServerUrl}?filter=(drone_id=65011048)&perPage=500`).then(data => {
        // const filteredData = data.data.items.filter(item => item.drone_id === 65011048);
        console.log(data.data);
        // console.log(data.data);
    });
})

app.post('/logs', (req, res) => {
    // res.json({ message : 'Hello World!' });

    // const response = axios.post(droneLogServerUrl, {
    //     temperature: req.body.temperature,
    // }).then(data => res.json(data.data));

    console.log(req.body);

    const response = axios.post(droneLogServerUrl, {
        ...req.body
    }).then(data => {
        console.log(data.data);
        // res.json(data.data)
    }
        
    )
})


app.listen(3000, () => {
    console.log('App listening on port 3000');
});