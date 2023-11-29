import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { handleSubmit } from './contexts/UserContext';

//views and components
import User from './views/User';
import Login from './views/Login';
import Signup from './views/Signup';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
			<Route path="/user" element={<User />} action={handleSubmit}></Route>
		</Route>
	)
);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
