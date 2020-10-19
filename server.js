const express =  require("express");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB database
connectDB();

app.get("/", (req, res) => res.send(`The API is running`));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));