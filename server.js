const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");

const cors = require("cors");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "dlrjs01!",
//   database: "hanatodo",
// });

const db = mysql.createPool({
  host: "hanatododb.clwe4uh9lis6.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  user: "user1",
  password: "user011",
  database: "hanatodo",
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

//-----------------------TODO 관련-------------------------------
// user1의 todolist 불러오기
app.get("/getUser1", (req, res) => {
  const sqlQuery =
    "SELECT id, content, DATE_FORMAT(deadline, '%Y/%m/%d') AS deadline, project, product, checked, shared FROM todolist ORDER BY deadline ASC";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    // console.log(result);
    // console.log(err);
    // console.log("hihihi");
  });
});

// user1에 todo 삽입하기
app.post("/postUser1", (req, res) => {
  const content = req.body.content;
  const deadline = req.body.deadline;
  const project = req.body.project;
  const product = req.body.product;
  const checked = req.body.checked;
  const shared = req.body.shared;
  const sqlQuery =
    "INSERT INTO todolist (content, deadline, project, product, checked, shared, user_name) VALUES (?,?,?,?,?,?,?) ";
  db.query(
    sqlQuery,
    [content, deadline, project, product, checked, shared, "user1"],
    (err, result) => {
      res.send(result);
      // console.log("-------------");
      // console.log(err);
      // console.log("-------------");
    }
  );
});

app.post("/updateUser1", (req, res) => {
  const id = req.body.id;
  const content = req.body.content;
  const deadline = req.body.deadline;
  const project = req.body.project;
  const product = req.body.product;
  const checked = req.body.checked;
  const shared = req.body.shared;
  const sqlQuery =
    "UPDATE todolist SET content = ?, deadline = ?, project = ?, product = ?, checked = ?, shared = ? WHERE id = ?";
  db.query(
    sqlQuery,
    [content, deadline, project, product, checked, shared, id],
    (err, result) => {
      res.send(err);
    }
  );
});

app.post("/removeUser1", (req, res) => {
  const id = req.body.id;
  const sqlQuery = "DELETE FROM todolist WHERE id = (?)";
  db.query(sqlQuery, [id], (err, result) => {
    res.send(err);
    console.log(id);
  });
});

//-------------------PROJECT 관련--------------------------

app.get("/getProject", (req, res) => {
  const sqlQuery =
    "SELECT project_id, projectName, user_name FROM projectList ORDER BY project_id ASC";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(err);
  });
});

app.post("/postProject", (req, res) => {
  const content = req.body.content;
  // console.log("------------");
  // console.log(content);
  // console.log("------------");

  const sqlQuery =
    "INSERT INTO projectList (projectName, user_name) VALUES (?,?) ";
  db.query(sqlQuery, [content, "user1"], (err, result) => {
    res.send(result);
    console.log(err);
  });
});
