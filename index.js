const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Merhaba Dünya!');
});

app.get('/kategori', (req,res) => {
    res.send('Kategori sayfasındasınız!');
});

//denemek için urlnin sonuna galeri/teknoloji/bu-icatlar-gorenleri-gulduruyor eklenebilir
app.get('/galeri/:categoryUrl/:titleUrl', (req, res) => {
	const category = req.params.categoryUrl;
	const titleUrl = req.params.titleUrl;
	
	res.send(`${category} kategorisindeki ${titleUrl} içeriğine bakıyorsunuz.`);
});

app.listen(3000, () => {
    console.log('Server açık');
});