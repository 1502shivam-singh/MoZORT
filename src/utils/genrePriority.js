const genrePriority = (list) => {

    const priorityTable = {
        "Horror": 0,
        "Mystery": 1,
        "Thriller": 2,
        "Crime": 3,
        "Comedy": 4,
        "Documentary": 5,
        "Science Fiction": 8,
        "Drama": 6,
        "Romance": 7,
        "Action": 8,
        "Adventure": 9,
        "Animation": 10,
        "War": 11,
        "Music": 12,
        "History": 13,
        "Fantasy": 14,
        "Family": 15,
        "Western": 16,
        "TV Movie": 17
    }

    /*
      [19, 0, 1, 20, 22, 100, 15, 5] ==> <0, 1>
      Approach 1 - find min, then min except that min - O(n), but 2 loops
	  Approach 2 - keep track of previous minimum and next least minimum. When we get the minimum element, we also have the second minimum.
    */

    let firstMin = Number.POSITIVE_INFINITY, secondMin = Number.POSITIVE_INFINITY, subGenre1 = '', subGenre2 = '';
    list.forEach((item, _) => {
		if(Math.min(firstMin, priorityTable[item]) === priorityTable[item]) {
			secondMin = firstMin;
			firstMin = Math.min(firstMin, priorityTable[item]);
			subGenre2 = subGenre1;
			subGenre1 = item;
		}
    });

	let genreTitle = '';
	if(secondMin === Number.POSITIVE_INFINITY) {
		genreTitle = `${subGenre1}`;
	} else {
		genreTitle = `${subGenre1} ${subGenre2}`;
	}

    return genreTitle;
}

export default genrePriority;
