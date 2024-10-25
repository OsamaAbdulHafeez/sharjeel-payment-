import emailTemplate from '../../email.template.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config()

const domainEmail = process.env.EMAIL
const password = process.env.PASSWORD
const domainPort = process.env.DOMAIN_PORT

const subject = 'Z design Logo'

const emailConfig = {
  host: 'mail.trademark-gov.us',
  port: domainPort,
  auth: {
    user: domainEmail,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: process.env.SMTP_PORT,
};


async function sendEmail(prop = { customerEmail: 'john.smith@gmail.com', customerName: "John Smith", message: "Hello john 😊!" }) {
  const { customerEmail, customerName, message } = prop;

  const template = emailTemplate({ name: customerName, email: customerEmail, message })
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: '"Trademark Gov" <info@trademark-gov.us>',
    to: customerEmail,
    subject: subject,
    text: template,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully', info);
    return { data: info, success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: error.message || 'Unknown error', success: false };
  }
}


export { sendEmail }