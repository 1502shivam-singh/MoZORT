
import dotenv from 'dotenv';

import getGenreMap from './src/lib/genreMap.js';

dotenv.config();

/*
 *
 * First access folder and get list of folder file names
 * Get folder file names as string and get movie name out of it
 * Use IMDB or some other API to get genre of the movie from API response
 * Use this genre string to create a directory/or if already exists put movie inside that folder
 * 
 * In case of complicated genre title (like docu-horror, horror-comedy etc.)
 *      then
 *          choose the higher priority genre, for example horror in case of docu-horror (use some algorithm for this prioritization).
 *          create chosen genre name's folder or if existing put movie inside that folder
 * 
 * 
 * 
 * 
 * Regex - /(.720p|.1080p|.480p|.360p|.240p)\S+/g
 * White.Noise.2020.360p.WEBRip.800MB.x264-GalaxyRG[TGx] --> (Output) -->.360p.WEBRip.800MB.x264-GalaxyRG[TGx]
 * 
 * 
 * 
*/

const args = process.argv;
console.log(args);

const main = () => {
    getGenreMap();
}

main();
