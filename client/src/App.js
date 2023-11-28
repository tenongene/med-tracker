import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';

//views and components
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Home />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
		</Route>
	)
);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
