import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';

//
// const successNotify = (input) => toast.success(input);
// const errorNotify = (input) => toast.error(input);

export const User = () => {
	//

	const { drugList, setDrugList, setCount, setFirstName, setUid, setEmail } = useContext(UserContext);
	//
	const userData = useLoaderData();
	console.log(userData.data[0].email.S);
	console.log(userData.data[0].drugList.L);

	setDrugList(userData.data[0].drugList.L);
	setCount(userData.data[0].drugList.L.length);
	setFirstName(userData.data[0].firstName.S);
	setUid(userData.data[0].id.N);
	setEmail(userData.data[0].email.S);

	return (
		<div>
			<Navbar />
			<SummaryCard />
			<div className="container">
				<div className="row">
					{drugList &&
						drugList.map((drug) => {
							return (
								<DrugCard
									key={drug.M.drugId.S}
									drugId={drug.M.drugId.S}
									drugName={drug.M.drugName.S}
									drugInfo={drug.M.drugInfo.S}
									strengthUnit={drug.M.strengthUnit.S}
									drugStrength={drug.M.drugStrength.S}
									refillsLeft={drug.M.refillsLeft.S}
									directions={drug.M.directions.S}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

//loader

export const userLoader = async ({ params }) => {
	const loaderData = await axios.get(`/api/user/${params.uid}`);
	return loaderData;
};
