const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// app.get("/api/contacts",(req,res)=>{
//     res.send("Get all contacts");
// });
app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});