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
	// eslint-disable-next-line
	const { drugList, count, firstName, emptyList, setDrugList, setCount, setEmptyList, setFirstName } =
		useContext(UserContext);
	//
	const userData = useLoaderData();
	console.log(userData.data[0].email.S);
	console.log(userData.data[0].drugList.L);

	setDrugList(userData.data[0].drugList.L);
	setCount(userData.data[0].drugList.L.length);
	setEmptyList(userData.emptyList);

	return (
		<div>
			<Navbar email={userData.data[0].email.S} />
			<SummaryCard count={count} firstName={firstName} emptyList={emptyList} />
			<div className="container">
				<div className="row">
					{drugList &&
						drugList.map((drug) => {
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
};

//loader

export const userLoader = async ({ params }) => {
	const loaderData = await axios.get(`/api/user/${params.id}`);
	return loaderData;
};
