require("dotenv").config();
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

(async function run() {
  console.log("running my daily report...");
  const locationRequest = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/DO/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=santo%20domingo`
  );
  const locationData = await locationRequest.json();
  const locationKey = locationData[0].Key;

  const forecastRequest = await fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}&language=es&details=true&metric=true`
  );
  const forecastData = await forecastRequest.json();
  const forecast = forecastData;
  const temperature = forecast.DailyForecasts[0].Temperature;
  const gifResquest = await fetch(
    `https://g.tenor.com/v1/random?q=weather&key=LIVDSRZULELA`
  );
  const gifData = await gifResquest.json();
  const gif = gifData.results[0].media;
  console.log(gif[0].tinygif.url);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER_EMAIL, // generated ethereal user
      pass: process.env.MAIL_USER_PASSWORD, // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: `"Marcos 👻" ${process.env.MAIL_USER_EMAIL}`, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: "Daily Report", // Subject line
    text: "Daily Report", // plain text body
    html: `<h1>Daily Report</h1>
    <h2>Weather</h2>
    <p>Forescast: ${forecast.Headline.Text}</p>
    <p>Min: ${temperature.Minimum.Value}°C</p>
    <p>Max: ${temperature.Maximum.Value}°C</p>
    <p>Media: ${
      (temperature.Minimum.Value + temperature.Maximum.Value) / 2
    }°C</p>
    <p><img src="${gif[0].tinygif.url}" /></p>`, // html body
  });
})();
