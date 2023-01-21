import * as https from 'node:https';
import dotenv from 'dotenv';

import readDir from './readDir.js';

dotenv.config();

const api_key = process.env.API_KEY;
let genreMap = new Map();

const getGenreMap = () => {
    https.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`, (res)=>{
        if(res.statusCode === 200) {
            const chunks = [];
        
            res.on('data', (chunk)=>{
                chunks.push(chunk);
            })
        
            res.on('end', ()=>{
                const response = chunks.join();
                const resObj = JSON.parse(response);
        
                resObj.genres.forEach((pair, _) => {
                    genreMap.set(pair.id, pair.name);
                })

                readDir('../', genreMap);
            })

        }
    
        res.on('error', (err) => {
            console.log(err);
        })
    })
}

export default getGenreMap;
