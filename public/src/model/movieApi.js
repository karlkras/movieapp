import dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch";

dotenv.config();

const MovieApi = class {

    async search(type, query) {

        const theParams = new URLSearchParams(query);
        theParams.append("api_key", process.env.TMDB_API_KEY);

        const theUrl = new URL(`${path.join(process.env.TMDB_API_URL,  path.join("search", type))}`)
        
        theUrl.search = theParams.toString();

        const res = await fetch(theUrl.href);

        if(res.ok && res.status === 200) {
            return { error: false, code: res.status, message: await res.json() }
        }
        return { error: true, code: res.status, message: res.statusText }
    }

}

export default MovieApi;