import React from 'react';
import './App.css';

// Import methods
import { fetchData } from './api';

// Import Contexts
import {
  useRestaurantStoreState,
  useRestaurantStoreDispatch
} from './store';

function App() {

  ///////////////////////////////////////////////
  // Subscribe to Contexts
  ///////////////////////////////////////////////
  const restaurantStoreState = useRestaurantStoreState();
  const restaurantStoreDispatch = useRestaurantStoreDispatch();

  ///////////////////////////////////////////////
  // Fetch Data in React Effect
  ///////////////////////////////////////////////
  React.useEffect(() => {

    // Initiate Data Transfer
    restaurantStoreDispatch({type: "init"})

    // Call Fetch Method and Update Status
    fetchData()
    .then(response => response.json())

    // Update Status to Success
    .then(data => {
      restaurantStoreDispatch({
        type: "success",
        data: data
      })
    })

    // Update Status to Failure
    .catch((error) => {
      console.log("Error:", error)
      restaurantStoreDispatch({type: "failure"})
    })

  }, [])


  return (
    <div className="App">
    </div>
  );
}

export default App;
