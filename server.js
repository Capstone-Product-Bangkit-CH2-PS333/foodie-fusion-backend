require("dotenv").config();
const express = require("express");
const exampleRouter = require("./routes/ExampleRoute");

const app = express();
const port = process.env.PORT || 3000


app.use("/example", exampleRouter);

app.listen(port, () => {
    console.log(`Server starting at port ${port}`)
})