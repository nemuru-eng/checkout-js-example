const express = require("express");

const app = express();

app.use(express.static("public"));

app.listen(4000, () => console.log("Running on port http://localhost:4000"));
