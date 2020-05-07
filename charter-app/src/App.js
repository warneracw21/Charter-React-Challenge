import React from 'react';

// Import Components
import Table from './table';

// Import methods
import { fetchData } from './api';

// Import Contexts
import {
  useRestaurantStoreDispatch,
  useSearchInfoStoreDispatch
} from './store';

function App() {

  ///////////////////////////////////////////////
  // Subscribe to Contexts
  ///////////////////////////////////////////////
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
      // Set restaurantData
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
      <Table/>
    </div>
  );
}

export default App;
