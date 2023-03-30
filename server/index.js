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
  const firstPersonName = req.body.firstPersonName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;
  const firstPersonBirthday = req.body.firstPersonBirthday;

  const secondPersonName = req.body.secondPersonName;
  const secondPersonEmail = req.body.secondPersonEmail;
  const secondPersonPassword = req.body.secondPersonPassword;
  const secondPersonBirthday = req.body.secondPersonBirthday;
  const anniDate = req.body.anniDate;

  db.query(
    "SELECT * from couplegoals.space WHERE spaceName = ?",
    [spaceName],
    (err, result) => {
      if (err) {
        res.send({ message: "Error, space not created." });
      }
      if (result.length > 0) {
        res.send({ message: "Space name taken, space not created." });
      } else {
        res.send({ message: "Space name is unique, space created successfully" });
        //space name not taken
        
    db.query(
      "INSERT INTO couplegoals.space ( id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, firstPersonBirthday,secondPersonName, secondPersonEmail, secondPersonPassword , secondPersonBirthday, anniDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, firstPersonBirthday,secondPersonName, secondPersonEmail, secondPersonPassword , secondPersonBirthday, anniDate
      ]
    );
      }
    }
  );
});


//first person login
app.post("/loginFirstPerson", (req, res) => {
  const spaceName = req.body.spaceName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;

  db.query(
    "SELECT * FROM couplegoals.space WHERE spaceName = ? and firstPersonEmail = ? and firstPersonPassword = ?",
    [spaceName, firstPersonEmail,firstPersonPassword],
    (err, result) => {
      if (result.length > 0) {
       
        console.log("user found");
        const name = result[0].firstPersonName;
        const firstPersonData = [name]

        console.log("data firstperson", firstPersonData);

        res.send({ data: firstPersonData, message: "Login is Successful"});
          // if (response) {
          //   //send full name
          //   // const firstPersonName = result[0].firstPersonName;
          //   // const secondPersonName = result[0].secondPersonName;
          //   // const staffData = [firstPersonName,secondPersonName];

          //   res.send({ message: "Login Successful"});
          // } 
       
      } else {
        console.log("user not found");
        res.send({ message: "User not found" });
      }
    }
  );
});


app.listen(process.env.PORT || 3003, () => {
  console.log("Server running on port");
});
