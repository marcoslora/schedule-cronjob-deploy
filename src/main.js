require("dotenv").config();
const nodemailer = require("nodemailer");

(async function run() {
  console.log("running my daily report...");

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
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1>Hello world????? </h1>", // html body
  });
})();
