import { BrowserRouter, Routes, Route } from 'react-router-dom';

//views and components
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="views">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/signup" element={<Signup />}></Route>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
