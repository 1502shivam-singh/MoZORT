import * as fs from 'node:fs';

import moveFile from '../utils/moveFile.js';
import genrePriority from '../utils/genrePriority.js';
import getGenres from './detail.js';

const args = process.argv;
console.log(args[3]);

const readDir = async (srcDir, genreMap) => {
    fs.readdir(srcDir, (err, files) => {
        if(err != null) {
            console.log(err);
        } else {
            files.forEach((file, _) => {
                if(err === null && file === args[2]) {
                    fs.readdir(`${srcDir}${file}`, (err, movies) => {
                        if(err != null) {
                            console.log(err);
                        } else {
                            movies.forEach((movieName, index) => {
                                getGenres(index, genreMap, movieName)
                                    .then((resolvedList)=>{
                                        if(resolvedList.genreList.length !== 0) {
                                            // console.log({movieName, resolvedList});
                                            const dest = genrePriority(resolvedList.genreList)
                                            moveFile(`${srcDir}${args[2]}/${movieName}`, `${srcDir}${args[2]}/sorted_movies/${dest}/${movieName}`)
                                        }
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                    })
                            })
                        }
                    })
                } else {
                    console.log(err);
                    console.log("Not target folder or error");
                }
            })
        }
    })
}

export default readDir;