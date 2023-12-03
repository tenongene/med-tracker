import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { submitAction } from './views/Login';

//views and components
import { User, userLoader } from './views/User';
import { Login } from './views/Login';
import Signup from './views/Signup';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Login />} action={submitAction}></Route>
			<Route path="/signup" element={<Signup />}></Route>
			<Route path="/user/:uid" element={<User />} loader={userLoader}></Route>
			<Route path="*" element={<ErrorBoundary />}></Route>
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
