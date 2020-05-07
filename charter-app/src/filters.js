// Methods for Filtering and Sorting Data

/////////////////////////////////////////////////
// Filter by State
/////////////////////////////////////////////////
function filterState(data, state) {
	if (state === "all") { return data }
	return data.filter(row => row.state === state);
}

/////////////////////////////////////////////////
// Filter by Genre
/////////////////////////////////////////////////
function filterGenre(data, genre) {
	if (genre === "all") { return data }
	return data.filter(row => {
		
		// Split on subgenres
		const subgenres = row.genre.split(',')

		// Iterate over subgenres, look for match
		for (var i=0; i<subgenres.length; i++) {
			if (subgenres[i] === genre) {
				return true
			}
		}

		// Return false on no match
		return false;
	})
}

/////////////////////////////////////////////////
// Filter by Query
/////////////////////////////////////////////////
function filterSearch(data, raw_query) {
	// if (raw_query === "") {
	// 	return data
	// }

	const query = new RegExp(raw_query.toLowerCase());
	return data.filter(row => {

		// Match name
		const name = row.name.toLowerCase();
		if (name.match(query)) {
			return true
		}

		// Match city
		const city = row.city.toLowerCase();
		if (city.match(query)) {
			return true
		}

		// Match genre
		const subgenres = row.genre.split(',')
		for (var i=0; i<subgenres.length; i++) {
			const subgenre = subgenres[i].toLowerCase();
			if (subgenre.match(query)) {
				return true
			}
		}

		// Return false on no match
		return false;
	})
}

function compare( a, b ) {
  if ( a < b ){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

function sortData(data, sortOrder, status) {

	if ((status === "init") | (status === undefined)) {
		return;
	}

	const [type, order] = sortOrder.split("-")

	if (order === "desc") {
		return data.sort((a, b) => compare(a[type], b[type]))
	} else {
		return data.sort((a, b) => compare(b[type], a[type]))
	}
}

export { filterState, filterGenre, filterSearch, sortData }