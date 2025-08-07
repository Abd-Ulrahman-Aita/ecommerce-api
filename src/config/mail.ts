import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOtpEmail = async (to: string, otp: string, subject = 'Your OTP Code') => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
  });
};
