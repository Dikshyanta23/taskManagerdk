const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errHandlerMiddleware = require("./middleware/errorHandler");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);

//handle 404 and any other routes
app.use(notFound);
app.use(errHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
