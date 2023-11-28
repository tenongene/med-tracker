import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { handleSubmitAction } from './contexts/UserContext';

//views and components
import User from './views/User';
import Login from './views/Login';
import Signup from './views/Signup';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Login />}></Route>
			<Route path="/user" element={<User />} action={handleSubmitAction}></Route>
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
