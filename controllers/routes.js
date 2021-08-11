const express = require('express');
const axios = require('axios');

require('dotenv').config();

const router = express.Router();

const apiurl = `http://api.airvisual.com/v2/cities?state=idaho&country=usa&key=${process.env.APIKEY}`;

router.get('/', (req, res) => {
	res.json({msg: 'hello'});
});

router.get('/cities', (req, res) => {
	try{
		axios.get(apiurl)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
				console.log(error)
				res.status(500).json(error);
		});
	}
	catch(error){
		console.log(error)
		res.status(500).json(error);
	}
});

router.get('/city', (req, res) => {
	const {city, state} = req.query;
	axios.get(`http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=USA&key=${process.env.APIKEY}`)
	.then(response => {
		res.json(response.data);
	})
	.catch(error => {
		console.log(error);
		res.status(500).json(error)
	})
})

router.get('/gps', (req, res) => {
	const {lat, long} = req.query;
	console.log(`lat: ${lat} long: ${long}`);
	axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.APIKEY}`)
	.then(response => {
		res.json(response.data);
	})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	})
});

router.get('/box', (req, res) => {
	const {northernBound, southernBound, easternBound, westernBound} = req.query;
	axios.get(`https://website-api.airvisual.com/v1/places/map?bbox=${westernBound},${southernBound},${easternBound},${northernBound}&units.temperature=fahrenheit&units.distance=mile&units.pressure=millibar&AQI=US&language=en`)
	.then(response => {
		axios.get(`https://website-api.airvisual.com/v1/places/map?bbox=${westernBound},${southernBound},${easternBound},${northernBound}&units.temperature=fahrenheit&units.distance=mile&units.pressure=millibar&AQI=US&language=en`)
		res.json(response.data);
	})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	})
})

module.exports = router;