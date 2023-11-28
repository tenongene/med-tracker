import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

//views and components
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			//TODO
			<Route path="/" element={<Home />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
		</Route>
	)
);

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<RouterProvider router={router} />
			</UserContextProvider>
		</div>
	);
}

export default App;
