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
  database: "couplegoals",
});

//register couples
app.post("/register", (req, res) => {
  const id = req.body.id;
  const spaceName = req.body.spaceName;
  console.log(spaceName);
  const firstPersonName = req.body.firstPersonName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;

  const secondPersonName = req.body.secondPersonName;
  const secondPersonEmail = req.body.secondPersonEmail;
  const secondPersonPassword = req.body.secondPersonPassword;

  //hash pw

  const anotherQuery=()=>{
    console.log("query here")
    db.query(
      "INSERT INTO space ( id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, secondPersonName, secondPersonEmail, secondPersonPassword) VALUES (?,?,?,?,?,?,?,?)",
      [
        id,
        spaceName,
        firstPersonName,
        firstPersonEmail,
        firstPersonPassword,
        secondPersonName,
        secondPersonEmail,
        secondPersonPassword,
      ],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result) {
          res.send(res.statusCode);
        }
      }
    );
  }

  db.query(
    "SELECT * from space WHERE spaceName = ?",
    [spaceName],
    (err, result) => {
      console.log("result", result)
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({ message: "Space name taken, space not created." });
      } else {
        res.send({ message: "Space name is unique, space created successfully" });
        //space name not taken
        anotherQuery();
      }
    }
  );
});


app.listen(process.env.PORT || 3002, () => {
  console.log("Server running on port");
});
