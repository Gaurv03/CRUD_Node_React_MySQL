import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors());

// multer file info
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Connection config
// Database = 'crud' and table = 'flags' using MySQL DB
const db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
};

// connection pool
let db = mysql.createConnection(db_config);
function handleDisconnect() {
  console.log("handleDisconnect()");
  db.destroy();
  db = mysql.createConnection(db_config);
  db.connect(function (err) {
    if (err) {
      console.log(" Error when connecting to db :", err);
      setTimeout(handleDisconnect, 1000);
    }
  });
}
db.connect(function (err) {
  if (err) {
    console.log("Connection is asleep (time to wake it up): ", err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
  }
});

app.get("/", (req, res) => {
  res.json("Hello this is database");
});

// Get data
app.get("/flags", (req, res) => {
  const q = "SELECT * FROM flags";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

// Add data
app.post("/flags", upload.single("file"), (req, res) => {
  const q = "INSERT  INTO flags (country,capital,flag) VALUES (?,?,?)";
  const values = [req.body.country, req.body.capital, req.file.filename];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json("Name has been created successfully");
  });
});

// Delete data
app.delete("/flags/:id", (req, res) => {
  const flagId = req.params.id;
  const q = "DELETE FROM flags WHERE id = ?";

  db.query(q, [flagId], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Flag has been deleted successfully");
  });
});

// Edit data
app.put("/flags/:id", upload.single("file"), (req, res) => {
  const flagId = req.params.id;
  const q = "UPDATE flags SET country=?, capital = ?, flag = ? WHERE id = ?";
  const values = [req.body.country, req.body.capital, req.file.filename];
  db.query(q, [...values, flagId], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Book has been updates successfully");
  });
});

app.listen(8000, () => {
  console.log("Connected to backend!");
});
