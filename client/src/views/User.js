import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Login } from '../views/Login';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';
import { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export const User = () => {
	//
	const { drugList } = useContext(UserContext);
	const accessToken = localStorage.getItem('accessToken');

	const userData = useLoaderData();
	console.log(userData);

	return (
		<>
			{accessToken ? (
				<div>
					<Navbar />
					<SummaryCard />
					<Toaster />
					<div className="container">
						<div className="row">
							{drugList &&
								drugList.map((drug) => {
									return (
										<DrugCard
											key={drug.drugId}
											drugId={drug.drugId}
											drugName={drug.drugName}
											drugInfo={drug.drugInfo}
											strengthUnit={drug.strengthUnit}
											drugStrength={drug.drugStrength}
											refillsLeft={drug.refillsLeft}
											directions={drug.directions}
										/>
									);
								})}
						</div>
					</div>
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

//loader
// export const userLoader = async ({ params }) => {
// 	const token = localStorage.getItem('accessToken');
// 	const response = await axios({
// 		url: `/api/user/${params.uid}`,
// 		method: 'GET',

// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	});
// 	console.log(response);
// 	return response;
// };
