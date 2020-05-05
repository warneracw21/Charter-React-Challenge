// Methods for Fetching Data from APIs
import {
	URL,
	APIKEY
} from './constants';

async function fetchData() {

	const response = await fetch(URL, {
		headers: {
			Authorization: 'Api-Key q3MNxtfep8Gt',
		}
	})
	
	return response;
}

export { fetchData };