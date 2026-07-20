require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
  console.log("1. Environment variables being read: EMAIL_USER and EMAIL_PASS");

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (emailUser) {
    const parts = emailUser.split('@');
    if (parts.length === 2) {
      const masked = parts[0].substring(0, 3) + '***@' + parts[1];
      console.log(`2. EMAIL_USER loaded: ${masked}`);
    } else {
      console.log(`2. EMAIL_USER loaded: ${emailUser.substring(0, 3)}***`);
    }
  } else {
    console.log("2. EMAIL_USER loaded: undefined");
  }

  console.log(`3. EMAIL_PASS present: ${emailPass ? 'YES' : 'NO'}`);

  console.log("4. Running transporter.verify()...");
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const success = await transporter.verify();
    console.log("4. Verify result: SUCCESS - Server is ready to take our messages");
  } catch (error) {
    console.log("4. Verify result: FAILED");
    console.log(error.message);
  }
}

testSMTP();
