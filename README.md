# MoZORT - The Movies Sorter

A CLI tool to reorient your movies directory, by sorting all movies as per genre into separate folders, so that you can choose which movie to watch next time as per your mood, faster.

- Download this repository, 
- Add required dependencies [(added below)](#DEPENDENCIES), 
- Place it one step, outside your movies directory,

            if `target` is folder containing movies
            then place it in same directory as the `target` folder

- Create your API_KEY from [TMDB](https://www.themoviedb.org/settings/api) website
- Create a .env file and add inside it 

            API_KEY="{YOUR_API_KEY_HERE}"

- Inside this repo, run

            node main.js {YOUR_MOVIES_DIRECTORY_NAME}

- Find your movies sorted inside "sorted_movies" folder inside the movie directory

For a test run, move target folder outside this repo and run `node main.js ./target` in this repo (after downloading and setting up) for a headstart.

## NOTE

- Movie release date in movie-folder/movie-name is ESSENTIAL for algorithm to work and sort movies.
- Keep the movies folder name in example formats like :

            A Quiet Place (2018) [BluRay] [720p] [YTS.AM] ..... (everything after (2018) is optional,)
            It.Chapter.Two.2019.1080p.HC.HDRip.X264.AC3-EVO
            Blade.Runner (1997)
            The Den 2016 720p WEBRip 650 MB - iExTV
            
- In case movie doesn't get sorted, try to rename the folder in style of folder names mentioned above.
- For customisation, check `src/lib/detail.js` and change the regex according to your need.

## IN-ACTION

417 GB worth movies sorted !!

![MoZORT_AtWork](https://user-images.githubusercontent.com/57267960/213862352-35985f5c-f74b-4980-b876-645d13881490.png)

More multimedia

[MoZORT.webm](https://user-images.githubusercontent.com/57267960/213862394-db0cddf2-af0c-46a9-bab3-d6a1844a4e56.webm)

## DEPENDENCIES

- [Node.js](https://nodejs.org/en/download/)
- A terminal to execute commands.
