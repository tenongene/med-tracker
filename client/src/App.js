import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
// import { userLoader } from './views/User';
import axios from 'axios';

//views and components
import {
	User,
	// userLoader
} from './views/User';
import { Login } from './views/Login';
import Signup from './views/Signup';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
			<Route
				path="user/:uid"
				element={<User />}
				// loader={userLoader}
			></Route>
		</Route>
	)
);

function App() {
	//
	const { accessToken } = useContext(UserContext);
	//axios globaal config
	axios.defaults.baseURL = 'http://localhost:9000';
	axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
