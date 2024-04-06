const express = require('express');
const axios = require('axios'); // Instala axios si no lo tienes instalado aún: npm install axios

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para el proxy

app.get('/proxyget', async (req, res)=>{
    console.log("llega"+req.url);

    let result = req.url.split("=");
    let direc = result[1]+'='+result[2]
    console.log(direc);

    try{
        const response = await axios({
            method: 'get',
            url: direc
        });

        console.log(response); 
    }catch(error){
        res.status(error.response || 500).json({ error: error.message });  
    }
})

app.post('/proxy', async (req, res) => {
    const { direc, method, data } = req.body;

    try {
        const response = await axios({
            method: method || 'get',
            url: direc,
            data: data || null
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
