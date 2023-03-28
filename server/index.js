const express = require("express"); //express dependency/middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const sendEmail = require("./utils/sendEmail");
const dotenv = require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

//register new staff
app.post("/register", (req, res) => {
 
  const username = req.body.username;
  const password = req.body.password;

  console.log("user", username)

  //hash pw

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO staffs ( username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result) {
          res.send(res.statusCode);
        }
      }
    );
  });
});



app.listen(process.env.PORT || 3002, () => {
  console.log("Server running on port");
});
