const express = require("express");
const plantRoutes = require("./src/api/routes/plant-route");

const app = express();
const PORT = 7000;

app.use(express.json());

app.use("/plants", plantRoutes);
app.get("/", (_req, res) => res.status(200).send("Welcome to Ecospace service"));

app.listen(PORT, () => console.log("Ecospace service running on PORT %d", PORT));
