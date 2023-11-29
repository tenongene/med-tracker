import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useActionData } from 'react-router-dom';
// import axios from 'axios';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';

//
// const successNotify = (input) => toast.success(input);
// const errorNotify = (input) => toast.error(input);

const User = () => {
	//
	const { email, drugList, count, firstName, emptyList, setDrugList, setCount, setEmptyList, setFirstName } =
		useContext(UserContext);
	//

	// const userData = useActionData();
	// console.log(userData);

	// useEffect(() => {
	// 	setDrugList(userData.drugList);
	// 	setCount(userData.drugList.length);
	// 	setFirstName(userData.user);
	// 	setEmptyList(userData.emptyList);
	// });

	// useEffect(() => {
	// 	handleSubmitAction(email, password);
	// }, [email, password]);

	// let user;
	// // const userData = useLoaderData();
	// // console.log(userData);

	// axios
	// 	.post('/api/user/login', { email, password })
	// 	.then((response) => {
	// 		console.log(response);
	// 		return response;
	// 		// successNotify(response.data.msg);
	// 		// localStorage.setItem('user', JSON.stringify(response));
	// 		// setDrugList(response.data.drugList);
	// 		// setCount(response.data.drugList.length);
	// 		// setEmptyList('');
	// 		// console.log(response);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error.message);
	// error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
	// console.log({ error: error.response.data.error, msg: error.response.data.msg });
	// });

	return (
		<div>
			<Navbar email={email} />
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

export default User;
