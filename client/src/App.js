//views and components
// import Home from './views/Home';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import DrugCard from './components/DrugCard';

function App() {
	return (
		<div className="App">
			<Navbar />
			<SummaryCard />
			<DrugCard />
		</div>
	);
}

export default App;
