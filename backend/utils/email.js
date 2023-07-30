const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  console.log(process.env.USER)
  try {
    const transporter = nodemailer.createTransport({
      host: 'http://localhost:8080/api/v1/',
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'sashank99narayan@gmail.com',
        pass: 'tauvozkdtqbkqycf',
      },
    });

    await transporter.sendMail({
      from: 'sashank99narayan@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
