import { createContext, useState } from 'react';
import { redirect } from 'react-router-dom';
// import toast from 'react-hot-toast';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [drugList, setDrugList] = useState('');
	const [count, setCount] = useState('0');
	const [emptyList, setEmptyList] = useState(
		'You have not yet added any medications. Click the button below to begin adding your medications.'
	);
	// const successNotify = (input) => toast.success(input);
	// const errorNotify = (input) => toast.error(input);

	//

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	//
	// };

	return (
		<UserContext.Provider
			value={{
				email,
				password,
				drugList,
				count,
				emptyList,
				setDrugList,
				setCount,
				setEmptyList,
				// handleSubmit,
				setEmail,
				setPassword,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const handleSubmitAction = async ({ request }) => {
	console.log(request);
	const data = await request.formData();
	const payload = {
		email: data.get('inputEmail'),
		password: data.get('inputPassword'),
	};
	console.log(payload);

	axios
		.post('/api/user/login', payload)
		.then((response) => {
			console.log(response);
			return response;
			// successNotify(response.data.msg);
			// localStorage.setItem('user', JSON.stringify(response));
			// setDrugList(response.data.drugList);
			// setCount(response.data.drugList.length);
			// setEmptyList('');
			// console.log(response);
		})
		.catch((error) => {
			console.log(error.message);
			// error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
			// console.log({ error: error.response.data.error, msg: error.response.data.msg });
		});

	return redirect('/user');
};
