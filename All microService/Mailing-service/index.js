const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
//////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//////////////////////////////////////////////////////////////
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));

const routes = require("./routes");
app.use("/api", routes);
// Server
server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});