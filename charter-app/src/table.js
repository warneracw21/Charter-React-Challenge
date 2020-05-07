import React from 'react';
import './table.css';

// Import Contexts
import {
	useRestaurantStoreState,
} from './store';

// Import Methods
import {
	filterSearch,
	filterState,
	filterGenre,
	sortData
} from './filters'


export default function Table() {

	///////////////////////////////////////////////
	// Subscribe to Contexts
	///////////////////////////////////////////////
	const restaurantStoreState = useRestaurantStoreState();
	const status = restaurantStoreState.status;
	var data = restaurantStoreState.data;
	var showData = data;

	///////////////////////////////////////////////
	// Set React Hooks
	///////////////////////////////////////////////
	const [position, setPosition] = React.useState(0)
	const [searchQuery, setSearchQuery] = React.useState("")
	const [sortOrder, setSortOrder] = React.useState("name-desc");

	const [stateFilter, setStateFilter] = React.useState("all");
	const [disableStateFilter, setDisableStateFilter] = React.useState(true);

	const [genreFilter, setGenreFilter] = React.useState("all");
	const [disableGenreFilter, setDisableGenreFilter] = React.useState(true);

	///////////////////////////////////////////////
	// Set Component Lifecycle Hooks
	///////////////////////////////////////////////
	React.useEffect(() => {
		// Set position to 0 on filter change
		setPosition(0)
	}, [stateFilter, genreFilter, disableStateFilter, disableGenreFilter])


	///////////////////////////////////////////////
	// Loading Component
	///////////////////////////////////////////////
	const buildLoader = () => {
		return (
			<p>Finding yummy places to eat for you ...</p>
		)
	}

	///////////////////////////////////////////////
	// Search Component
	///////////////////////////////////////////////
	const buildSearch = () => (
		<div id="search-bar-container">
			<input 
				type="text" 
				id="search" 
				onKeyUp={(event) => setSearchQuery(event.target.value)}
				placeholder="Search for Restaurants ..." 
				title="Type in a name"/>
		</div>
	);

	///////////////////////////////////////////////
	// Filter Component
	///////////////////////////////////////////////
	const buildFilters = () => {

		// Extract States
		const states = data.map(row => row.state)
		
		// Extract genres
		var genres = [];
		let row
		var subgenres;
		for (var i=0; i<data.length; i++) {
			row = data[i];
			subgenres = row.genre.split(',')

			// Iterate over subgrenes
			// only include subgrene if not in genre
			for (var j=0; j<subgenres.length; j++) {
				if (!genres.includes(subgenres[j])) {
					genres.push(subgenres[j])
				}
			}
		}
	
		return (
			<div id="filter-container">
				<div id="state-filter-container">
					<p className="filter-label">State Filters</p>
					<input 
						type="checkbox" 
						name="activate-state-filter" 
						onChange={(event) => setDisableStateFilter(!event.target.checked)}
					/>
					<select 
						disabled={disableStateFilter}
						onChange={(event) => setStateFilter(event.target.value)}>
						<option value="all">All</option>
						{states.map(state => (
							<option value={state}>{state}</option>))}
					</select>
				</div>
				<div id="genre-filter-container">
					<p className="filter-label">Genre Filters</p>
					<input 
						type="checkbox" 
						name="activate-genre-filter" 
						onChange={(event) => setDisableGenreFilter(!event.target.checked)}
					/>
					<select 
						disabled={disableGenreFilter}
						onChange={(event) => setGenreFilter(event.target.value)}>
						<option value="all">All</option>
						{genres.map(genre => (
							<option value={genre}>{genre}</option>))}
					</select>
				</div>

			</div>
		);
	}

	///////////////////////////////////////////////
	// Pagination Component
	///////////////////////////////////////////////
	const buildPagination = () => {

		// Calculate Pagination Parameters
		var startPosition = 10 * position
		var endPosition = 10 * (position + 1);
		endPosition = (endPosition > showData.length) ? showData.length: endPosition;

		return (
			<div id="pagination-container">
				<button 
					disabled={(position === 0)}
					onClick={() => setPosition(state => state - 1)}>
						<p className="pagination-button">{"← Prev"}</p>
					</button>
					<p id="pagination-title">{startPosition + 1} ... {endPosition}</p>
				<button 
					disabled={((position+1)*10 > showData.length)}
					onClick={() => setPosition(state => state + 1)}>
						<p className="pagination-button">{"Next →"}</p>
				</button>
			</div>
		);
	}

	
	///////////////////////////////////////////////
	// Table Component
	///////////////////////////////////////////////
	const buildTable = () => {

		// Helper function for settin order decals on table heads
		const setOrderDecal = (th) => {

			if (sortOrder.split("-")[0] === th) {

				if (sortOrder.split("-")[1] === "desc") {
					return "▼"
				} else {
					return "▲"
				}
			} else {
				return null
			}

		}

		// Sort Data
		var sortedData = sortData(data, sortOrder, status)

		// Filtering Logic
		if ((!disableStateFilter) | (!disableGenreFilter)) {

			// Filter states if checked
			if (!disableStateFilter) {
				showData = filterState(showData, stateFilter)
			}

			// Filter genres if checked
			if (!disableGenreFilter) {
				showData = filterGenre(showData, genreFilter)
			}
		} 

		// Filter search data
		showData = filterSearch(showData, searchQuery);

		// Calculate Pagination Parameters
		var startPosition = 10 * position
		var endPosition = 10 * (position + 1);
		endPosition = (endPosition > showData.length) ? showData.length: endPosition;


		return (
			<div id="table-container">
				<table id="table">
					<tr>
						<th
							className="th-hoverable"
							id={(sortOrder.split("-")[0] === "name") ? "active-table-head": null}
							onClick={() => 
								setSortOrder(state => (state !== "name-desc") ? "name-desc": "name-asc")}
								>Name {setOrderDecal("name")}</th>
						<th
							className="th-hoverable"
							id={(sortOrder.split("-")[0] === "city") ? "active-table-head": null}
							onClick={() => 
								setSortOrder(state => (state !== "city-desc") ? "city-desc": "city-asc")}
								>City {setOrderDecal("city")}</th>
						<th
							className="th-hoverable"
							id={(sortOrder.split("-")[0] === "state") ? "active-table-head": null}
							onClick={() => 
								setSortOrder(state => (state !== "state-desc") ? "state-desc": "state-asc")}
								>State {setOrderDecal("state")}</th>
						<th>Phone</th>
						<th>Genres</th>
					</tr>
					{showData.slice(startPosition, endPosition).map(row => (
						<tr>
							<td>{row.name}</td>
							<td>{row.city}</td>
							<td>{row.state}</td>
							<td>{row.telephone}</td>
							<td>
								<ul>
									{row.genre.split(",").map(genre => <li>{genre}</li>)}
								</ul>
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}

	return (
		<div>
			{status === 'success' ? (
				<div id="app-container">
					<div id="header-container">
					{ buildSearch() }
					{ buildPagination() }
					{ buildFilters() }
					</div>
					{ buildTable() }
				</div>
				): buildLoader()}
		</div>
	)


}