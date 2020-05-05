import React from 'react';
import './table.css';

// Import Contexts
import {
	useRestaurantStoreState,
} from './store';

export default function Table() {

	///////////////////////////////////////////////
	// Subscribe to Contexts
	///////////////////////////////////////////////
	const restaurantStoreState = useRestaurantStoreState();

	// if loading, make loading svg of spinning fork and spoon

	// else
	const buildTable = () => {
		const data = restaurantStoreState.data;

		return (
			
		);
	}


}