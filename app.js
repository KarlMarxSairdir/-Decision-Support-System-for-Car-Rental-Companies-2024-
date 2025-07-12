const express = require('express');
const app = express();
const router = require('./routers');


const port = 3000;
const path = require('path'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api", router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});