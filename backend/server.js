const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

require("dotenv").config();
const axios = require("axios");

app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});


