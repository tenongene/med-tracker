import { useEffect, useState } from 'react';
import axios from 'axios';

//views and components
// import Home from './views/Home';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import DrugCard from './components/DrugCard';

function App() {
	const [drugList, setDrugList] = useState(null);
	const [count, setCount] = useState('0');

	useEffect(() => {
		const getDrugList = () => {
			axios
				.get('/api/drugs')
				.then((response) => {
					console.log(response.data);
					console.log(response.data.length);
					setDrugList(response.data);
					setCount(response.data.length);
				})
				.catch((error) => {
					console.log(error.message);
				});
		};

		getDrugList();
	}, []);

	return (
		<div className="App">
			<Navbar />
			<SummaryCard count={count} />
			<div className="container">
				<div className="row">
					{drugList &&
						drugList.map((drug) => {
							return (
								<DrugCard
									key={drug.id.N}
									ident={drug.id.N}
									drugName={drug.drugName.S}
									drugInfo={drug.drugInfo.S}
									strengthUnit={drug.strengthUnit.S}
									drugStrength={drug.drugStrength.N}
									refillsLeft={drug.refillsLeft.N}
									directions={drug.directions.S}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default App;
