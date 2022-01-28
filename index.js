require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
var morgan = require("morgan");
var cors = require("cors");

//Routers
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const chapterRoutes = require("./routes/chapter");
const podcastRoutes = require("./routes/podcast");
const videoRoutes = require("./routes/video");
const favouriteRoutes = require("./routes/favourite");
const userRoutes = require("./routes/user");
//Routers

// Middleware
const middleware = [
  cors(),
  morgan("tiny"),
  express.json(),
  express.static("public"),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
];
app.use(middleware);
// Middleware

// MongoDB configuration
const db = require("./config/db");
mongoose
  .connect(db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log(err));
// MongoDB configuration

//Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", favouriteRoutes);
//Use Routes

//Initialize Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET, POST"],
  },
});
//Initialize Socket

//Use Events
const notificationHandlers = require("./socket/notification");
//Use Events

//Use Socker IO
const onConnection = (socket) => {
  console.log(`New User Connected: ${socket.id}`);
  notificationHandlers(io, socket);
}

io.on("connection", onConnection);
//Use Socker IO

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//error handling

//serve app
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//serve app
