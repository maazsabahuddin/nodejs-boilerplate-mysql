const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const config = require("./config");

const apiRouter = require("./api");

app.use(function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", (req, res) => { res.send("Server is running fine."); })
app.use("/api/v1/", apiRouter);

// Serve static files for frontend
// app.use(express.static(path.join(__dirname, "public")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
