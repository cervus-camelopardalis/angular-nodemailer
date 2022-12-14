## Send an e-mail when user signs up

Send an e-mail when user signs up using [Nodemailer](https://www.npmjs.com/package/nodemailer) and [Express Handlebars plugin for Nodemailer](https://www.npmjs.com/package/nodemailer-express-handlebars) (to generate HTML e-mails).

*Note: Added timestamp (ISO 8601) in PostgreSQL when user signs up (see `database.sql` and `server.js` files)*

---

## Setup

1. Clone the repo: `git clone https://github.com/cervus-camelopardalis/angular-nodemailer.git`
2. Create PostgreSQL database (see `database.sql` file)
3. Insert your database user and password (edit `db.js` file)
4. Install Express modules: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>npm i`
5. Install Angular modules: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>npm i`
6. Start Express server: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>nodemon server`
7. Run Angular app: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>ng serve -o`
8. [Create](https://ethereal.email/create) your Ethereal e-mail (this is your "from" e-mail)
9. Insert your Ethereal e-mail user and pass (edit `server.js` file)
10. [Create](https://temp-mail.org/en/) your temporary e-mail (this is your "to" e-mail)
11. Sign up with your temporary e-mail in Angular client
12. [Log in](https://ethereal.email/login) with your Ethereal e-mail (you should see the e-mail was successfully sent)

---

## Screenshots

Step 12:

![Step 12](https://github.com/cervus-camelopardalis/angular-nodemailer/blob/main/01-screenshot-ethereal.png?raw=true)

PostgreSQL:

![PostgreSQL](https://github.com/cervus-camelopardalis/angular-nodemailer/blob/main/02-screenshot-postgres.png?raw=true)