import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import Context Providers
import { RestaurantStoreProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
  	<RestaurantStoreProvider>
    	<App />
    </RestaurantStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
