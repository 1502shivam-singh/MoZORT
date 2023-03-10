import * as https from 'node:https';

import dotenv from 'dotenv'
dotenv.config()

const api_key = process.env.API_KEY;

function getDetails(index, htable, query) {
   
    let genreList = [];
    // match for movie name
    const nameRegex = /((\S+\s)+(?=(((\(\d{4}\)))|(\d{4}))))|(\S+\s)*(\S+(?=\[\d{4}\]))|((\S)+(?=.\d{4}.(\d+|\w)))|((\S+)(?=(.S\d{2})))/gm

    const movieSubstring = query.match(nameRegex);
    let movieNameQuery
    if(movieSubstring != null) {
        movieNameQuery = movieSubstring[0].split('.'||' ').join('+');
    }

    // match for movie release date
    const movieReleaseYear = query.match(/\d{4}/gm) != null ? query.match(/\d{4}/gm)[0] : '';
    
    let type = 'movie';
    if(query.match(/((\S+)(?=(.S\d{2})))/gm) != null) {
        type = 'tv';
    }
    
    return new Promise((resolve, reject)=>{
        https.get(`https://api.themoviedb.org/3/search/${type}?api_key=${api_key}&query=${movieNameQuery}`, (res) => {
            if (res.statusCode === 200) {
                const chunks = [];
                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                res.on('end', () => {
                    const response = chunks.join();
                    const resObj = JSON.parse(response);

                    let equiObj = {};

                    for (let index = 0; index < resObj.results.length; index++) {
                        let el;
                        try {
                            el = resObj.results[index];
                        } catch (error) {
                            console.log(error);
                        }
    
                        if (el.release_date === undefined) {
                            break;
                        } else {                            
                            if (type === 'movie') {     
                                let release = el.release_date.split('-')[0];
                                if (movieReleaseYear <= release + 5 && movieReleaseYear >= release - 5) {
                                    equiObj = el;
                                    el.genre_ids.forEach((id, index) => {
                                        genreList.push(htable.get(id));
                                    });
                                    break;
                                }
                            } else {
                                equiObj = el;
                                el.genre_ids.forEach((id, index) => {
                                    genreList.push(htable.get(id));
                                });
                                break;
                            }
                        }
                    }
    
                    resolve({index, movieNameQuery, genreList});
                });
            }
    
            res.on('error', (err) => {
                genreList.push({ error: err });
                reject(err);
            });
        })   
    })
   
}

export default async function getGenres(index, genreTable, query) {
    const genreList = await getDetails(index, genreTable, query);
    return genreList;
}