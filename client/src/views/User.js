// import { useContext } from 'react';
import { useActionData } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';

import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';

function User() {
	const userData = useActionData();
	// const { drugList } = useContext(UserContext);

	return (
		<div>
			<Navbar />
			<SummaryCard />
			<div className="container">
				<div className="row">
					{userData &&
						userData.drugList.map((drug) => {
							return (
								<DrugCard
									key={drug.M.drugId.N}
									drugId={drug.M.drugId.N}
									drugName={drug.M.drugName.S}
									drugInfo={drug.M.drugInfo.S}
									strengthUnit={drug.M.strengthUnit.S}
									drugStrength={drug.M.drugStrength.N}
									refillsLeft={drug.M.refillsLeft.N}
									directions={drug.M.directions.S}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default User;