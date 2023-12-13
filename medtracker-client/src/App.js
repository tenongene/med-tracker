import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

import axios from 'axios';

//views and components
import { User } from './views/User';
import { Login } from './views/Login';
import Signup from './views/Signup';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
			<Route path="/home" element={<User />}></Route>
			<Route path="/*" element={<ErrorBoundary />}></Route>
		</Route>
	)
);

function App() {
	//
	const { accessToken } = useContext(UserContext);
	//axios globaal config
	// axios.defaults.baseURL = 'https://o6bgnvrfpx5tlkff2vubrfawri0ioclf.lambda-url.us-east-1.on.aws/';
	axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
