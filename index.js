const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


// Moysklad API tokeni
const token = 'YWRtaW5Ad2ViYWJiYXM5MTphYmJhczEyMw=='; // Tokenni shu yerga qo'ying

app.get('/get-image', async (req, res) => {
    const id = req.query.id; // id ni query'dan olish
    const imageUrl = `https://api.moysklad.ru/api/remap/1.2/download/${id}`;

    if (!id) {
        return res.status(400).send('ID parameter is required');
    }

    try {
        const response = await axios.get(imageUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        });

        res.set('Content-Type', response.headers['content-type']);
        res.set('Content-Disposition', 'inline; filename=image.jpg');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});