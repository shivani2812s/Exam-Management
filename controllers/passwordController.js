const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ResetToken = require('../models/resetToken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivanisingh36813@gmail.com',
    pass: process.env.password,
  },
});

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const forgetPassword = async (req, res) => {
  const userEmail = req.body.email;

  const resetToken = generateToken();

  const resetTokenDoc = new ResetToken({
    email: userEmail,
    token: resetToken,
  });

  try {
    await resetTokenDoc.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save reset token' });
  }

  const resetLink = `http://localhost:3001/resetpassword?token=${resetToken}`;
  console.log(resetLink);

  const mailOptions = {
    from: 'shivanisingh36813@gmail.com',
    to: userEmail,
    subject: 'Password Reset',
    html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }

    console.log('Reset email sent: ' + info.response);
    res.json({ message: 'Reset email sent successfully' });
  });
};

const forget = (req, res) => {
  res.render('forget');
};

const reset = (req, res) => {
  res.render('reset');
};

module.exports = { forgetPassword, forget, reset };
