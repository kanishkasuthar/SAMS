const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // SMTP Verification
  console.log(`[SMTP] Verifying SMTP connection to Gmail...`);
  await transporter.verify();
  console.log(`[SMTP] SMTP connection verified successfully.`);

  // Define the email options
  const mailOptions = {
    from: '"SAMS Platform" <no-reply@sams.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
