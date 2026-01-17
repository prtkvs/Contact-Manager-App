const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// app.get("/api/contacts",(req,res)=>{
//     res.send("Get all contacts");
// });
const allowedOrigins = [
  "http://localhost:3000",
  // "https://contact-manager-app-flame.vercel.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

//testing api
app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});