const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const pool = require('./db');

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
/***************************************************/
/********************* Sign up *********************/
/***************************************************/
app.post('/users/signup', async(req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const email = req.body.email;
    const password = hashedPassword;
    const date = new Date();
    
    const newUser = pool.query('INSERT INTO users (email, password, signed_up_date) VALUES ($1, $2, $3)', [email, password, date])
      .then (() => {
        /***************************************************/
        /***************************************************/
        /***************************************************/
        /* Nodemailer */
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            /* https://ethereal.email/create */
            user: 'xxxxx.xxxxx@ethereal.email',
            pass: 'xxxxx'
          }
        });

        /* Handlebars */
        const handlebarOptions = {
          viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
          },
          viewPath: path.resolve('./views/')
        }

        transporter.use('compile', hbs(handlebarOptions));

        const options = {
          from: 'xxxxx.xxxxx@ethereal.email',
          to: email, /* req.body.email */
          subject: 'Verify your e-mail',
          template: 'verify-email'
        }

        /* Send e-mail */
        transporter.sendMail(options, function(err, info) {
          if (err) {
            console.log('Error: ' + err);
          } else {
            console.log('E-mail sent: ' + info.response);
          }
        });
        /***************************************************/
        /***************************************************/
        /***************************************************/

        res.status(201).json({ message: 'Sign up successful' });
      })
      .catch (err => {
        if (err.code === '23505') {
          res.status(409).json({ message: 'Email already exists in the database' });
        }
      });
  } catch {
    res.status(500).send();
  }
});

/***************************************************/
/********************* Sign in *********************/
/***************************************************/
app.post('/users/signin', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingUsers = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = existingUsers.rows[0];

  if (user == undefined) {
    return res.status(400).json({ message: 'Incorrect e-mail' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const email = req.body.email;
      const user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken: accessToken });
    } else {
      return res.status(400).json({ message: 'Incorrect password.' });
    }
  } catch {
    res.status(500).send();
  }
});

/**************************************************/
/******************** Get user ********************/
/**************************************************/
app.get('/users', verifyToken, async(req, res) => {
  const email = req.user.email;

  var getAllExistingUsers = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  var user = getAllExistingUsers.rows[0];
  return res.status(200).json({ user });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

/* Set port and listen for requests */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});