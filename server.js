require("dotenv").config();
const express = require("express");
const exampleRouter = require("./routes/ExampleRoute/ExampleRoute");
const routers = require("./routes/index")
const database = require("./config/database")

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())


database
    .authenticate()
    .then(() => {
        console.log(
            "Successfully connected to database " + process.env.DB_NAME,
        );
    })
    .catch((err) => {
        console.error("Error: " + err);
    });

app.use("/example", exampleRouter);
routers.forEach((router) => {
    app.use(router.prefix, router.router)
})
app.listen(port, () => {
    console.log(`Server starting at port ${port}`)
})
