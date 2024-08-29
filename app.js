import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import MovieApi from "./public/src/model/movieApi.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

dotenv.config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(express.static("public"));

app.get("/search", (req, res) => {
    res.render("search");
});

app.get("/results", async (req, res) => {
    const theMovieApi = new MovieApi();
    const theQuery = req.query.search;
    const results = await theMovieApi.search("movie", `query=${theQuery}`);



    res.render("movies", {data: results.message, query: theQuery});
});

const thePort = process.env.APP_PORT ?? 3000;

app.listen(thePort, () => {
    console.log(`server running and listening on port # ${thePort}`);
})



