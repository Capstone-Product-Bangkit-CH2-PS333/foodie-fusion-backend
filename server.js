require("dotenv").config();
const express = require("express");
const cors = require("cors")
const routers = require("./routes/index")
const database = require("./config/database")

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


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
routers.forEach((router) => {
    app.use(router.prefix, router.router)
})
app.listen(port, () => {
    console.log(`Server starting at port ${port}`)
})
