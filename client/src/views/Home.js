import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';

function Home() {
	const [drugList, setDrugList] = useState();
	const [count, setCount] = useState('0');
	const [emptyList, setEmptyList] = useState(
		'You have not yet added any medications. Click the button below to begin adding your medications.'
	);

	// useEffect(() => {
	// 	const getDrugList = () => {
	// 		axios
	// 			.get('/api/drugs')
	// 			.then((response) => {
	// 				// console.log(response.data);
	// 				// console.log(response.data.length);
	// 				setDrugList(response.data);
	// 				setCount(response.data.length);
	// 				if (response.data.length !== 0) {
	// 					setEmptyList('');
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.log(error.message);
	// 			});
	// 	};

	// 	getDrugList();
	// }, []);

	return (
		<div>
			<Navbar />
			<SummaryCard count={count} emptyList={emptyList} />
			<div className="container">
				<div className="row">
					{drugList &&
						drugList.map((drug) => {
							return (
								<DrugCard
									key={drug.id.N}
									id={drug.id.N}
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

export default Home;
