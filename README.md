# MoZORT

A CLI tool to reorient your movies directory, by sorting all movies as per genre into separate folders, so that you can choose which movie to watch next time as per your mood, faster.

- Download this repository, 
- Add required dependencies (added below), 
- Place it outside your movies folder, 
- Go inside the downloaded folder and run

            node main.js ./{YOUR_MOVIES_DIRECTORY_NAME}

- Find your movies sorted inside "sorted_movies" folder

## NOTE

- Movie release date in movie-folder/movie-name is ESSENTIAL for algorithm to work and sort movies.
- Keep the movies folder name in example formats like :

            A Quiet Place (2018) [BluRay] [720p] [YTS.AM] ..... (everything after (2018) is optional,)
            It.Chapter.Two.2019.1080p.HC.HDRip.X264.AC3-EVO
            Blade.Runner (1997)
            The Den 2016 720p WEBRip 650 MB - iExTV
            
- In case movie doesn't get sorted, try to rename the folder in style of folder names mentioned above.
- For customisation, check `src/lib/detail.js` and change the regex according to your need.
