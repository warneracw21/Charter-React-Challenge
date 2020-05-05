import React from 'react';

// Set up Contexts
const RestaurantStoreStateContext = React.createContext(null);
const RestaurantStoreDispatchContext = React.createContext(null);

const RestaurantContextProvider = ({children}) => {

	// Define React Hook for getting and setting state
	const [restaurantStoreState, restaurantStoreDispatch] = React.useReducer((state, action) => {

			// Switch on action type
			switch (action.type) {
				case 'init': {
					console.log("Initiating Data Update")
					return {...state, status: 'init'};
				}
				case 'success': {
					console.log("Successfull Data Update")
					return {...state, status: 'success', data: action.data};
				}
				case 'failure': {
					console.log("Failure Data Update")
					return {...state, status: 'failure'}
				}
				default: {
					return state;
				}
			}
		}, { status: 'init' })


	return (
		<RestaurantStoreStateContext.Provider value={restaurantStoreState}>
			<RestaurantStoreDispatchContext.Provider value={restaurantStoreDispatch}>
				{ children }
			</RestaurantStoreDispatchContext.Provider>
		</RestaurantStoreStateContext.Provider>
	)
}

const useRestaurantStoreState = () => {

	const context = React.useContext(RestaurantStoreStateContext);
	if (context === undefined) {
		throw new Error("useRestaurantStoreState inside of RestaurantStoreStateContext")
	}
	return context;
}

const useRestaurantStoreDispatch = () => {
	
	const context = React.useContext(RestaurantStoreDispatchContext);
	if (context === undefined) {
		throw new Error("useRestaurantStoreDispatch inside of RestaurantStoreDispatchContext")
	}
	return context;
}

export { RestaurantContextProvider, useRestaurantStoreState, useRestaurantStoreDispatch }

