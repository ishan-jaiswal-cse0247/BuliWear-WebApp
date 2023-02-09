import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
const userRouter = express.Router();
const businessmail = 'ashu.aa79@gmail.com';
userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'secret123'
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});
userRouter.post('/signup', async (req, res) => {
  const mailtomail = req.body.email;
  const mailto = req.body.name;
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: 'ooxiwnmtkeduqyep',
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${mailtomail}`,
    subject: 'Welcome to Buliwear',
    text: `Hi ${mailto}, thank you for joining our Buliwear Family.`,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

userRouter.get('/isAdmin', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

userRouter.get('/name', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', name: user.name });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

userRouter.post('/contact', async (req, res) => {
  const conemail = req.body.email;
  const conname = req.body.name;
  const conmessage = req.body.message;
  console.log(req.body);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: 'ooxiwnmtkeduqyep',
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${businessmail}`,
    subject: `${conname} contacted from Buliwear`,
    text: `Name:- ${conname} 
    Email:- ${conemail}
    Message:- ${conmessage} `,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ status: 'ok' });
    }
  });
});

userRouter.post('/sendnews', async (req, res) => {
  const message = req.body.description;
  console.log(req.body);
  try {
    const data = await User.find({}, { email: 1, _id: 0 });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${businessmail}`,
        pass: 'ooxiwnmtkeduqyep',
      },
    });

    //console.log(data);
    data.forEach((emails) => {
      const newsemailto = emails.email;
      var mailOptions = {
        from: `${businessmail}`,
        to: `${newsemailto}`,
        subject: 'Welcome to Buliwear',
        text: `${message}, Thank you for joining our Buliwear Family.`,
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

userRouter.post('/buy/:id', async (req, res) => {
  const mailtomail = req.body.email;
  const mailto = req.body.name;
  const pid = req.params.id;
  const address = req.body.address;
  const mobno = req.body.mobno;
  //console.log(req.body);
  try {
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: 'ooxiwnmtkeduqyep',
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${mailtomail}`,
    subject: `Order from ${mailto}`,
    text: `Hi ${mailto}, thank you for ordering our product and joining our Buliwear Family.
    Shipping Details :- 
      Name - ${mailto}
      Email - ${mailtomail}
      MobNum - ${mobno}
      Address - ${address}
      Product - http://localhost:3000/productdetails/${pid}
      Thank you for Shopping with us, We will reach you as soon as possible`,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

export default userRouter;
