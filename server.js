const express =  require("express");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => res.send(`The API is running`));


// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));