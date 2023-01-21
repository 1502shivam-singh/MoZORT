import * as https from 'node:https';

import dotenv from 'dotenv'
dotenv.config()

const api_key = process.env.API_KEY;

function getDetails(index, htable, query) {
    // console.log(htable);
    /*
        initial_regex = \S+(?=(.([1-2][0-9][0-9][0-9])))

        regex1 = ((\S+ )*(?=((\(\d{4}\)))|(\d{4})))|(\S+(?=(.(\d{4}))))
        regex2 = ((\S+ )+(?=(((\(\d{4}\)))|(\d{4}))))|((\S* )*(\S(?=(\[\d{4}\]))))|(\S+(?=.\d{4}))
                sub_regex = (\S+\s)*(\S+(?=\[\d{4}\]))

        regex3 = ((\S+ )+(?=(((\(\d{4}\)))|(\d{4}))))|(\S+\s)*(\S+(?=\[\d{4}\]))|(\S+(?=.\d{4}))        
                sub_regex = (\S+(?=.\d{4}.\d))

        regex4 = ((\S+\s)+(?=(((\(\d{4}\)))|(\d{4}))))|(\S+\s)*(\S+(?=\[\d{4}\]))|((\S)+(?=.\d{4}.(\d+|\w)))
    
        Original regex with TV Show name regex ---
        regex = ((\S+\s)+(?=(((\(\d{4}\)))|(\d{4}))))|(\S+\s)*(\S+(?=\[\d{4}\]))|((\S)+(?=.\d{4}.(\d+|\w)))|((\S+)(?=(.S\d{2})))
    */
   
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
    
    // console.log({movieNameQuery, movieReleaseYear});
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

                    // console.log(resObj);
                    // console.log(movieNameQuery);
                    for (let index = 0; index < resObj.results.length; index++) {
                        const el = resObj.results[index];
    
                        if (type === 'movie') {
                            if (movieReleaseYear === el.release_date.split('-')[0]) {
                                equiObj = el;
                                el.genre_ids.forEach((id, index) => {
                                    genreList.push(htable.get(id));
                                    // console.log(htable.get(id));
                                });
                                break;
                            }
                        } else {
                            equiObj = el;
                            el.genre_ids.forEach((id, index) => {
                                genreList.push(htable.get(id));
                                // console.log(htable.get(id));
                            });
                            break;
                        }
    
                    }
    
                    resolve({index, movieNameQuery, genreList});
                });
            }
    
            res.on('error', (err) => {
                // error handling
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