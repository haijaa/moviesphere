const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

const actorRoutes = require("./routes/actorRoutes");
const movieRoutes = require("./routes/movieRoutes");
const directorRoutes = require("./routes/directorRoutes");
const genresRoutes = require("./routes/genresRoutes");

app.use(actorRoutes);
app.use(movieRoutes);
app.use(directorRoutes);
app.use(genresRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
