import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
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
	const successNotify = (input) => toast.success(input);
	const errorNotify = (input) => toast.error(input);
	//

	const handleSubmit = (e) => {
		e.preventDefault();

		//
		axios
			.post('/api/user/login', { email, password })
			.then((response) => {
				successNotify(response.data.msg);
				localStorage.setItem('user', JSON.stringify(response));
				setDrugList(response.data.drugList);
				setCount(response.data.drugList.length);
				setEmptyList('');

				console.log(response);
			})
			.catch((error) => {
				error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
				console.log({ error: error.response.data.error, msg: error.response.data.msg });
			});
	};

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
				handleSubmit,
				setEmail,
				setPassword,
			}}>
			{children}
		</UserContext.Provider>
	);
};
