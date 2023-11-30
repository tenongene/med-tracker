import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [drugList, setDrugList] = useState('');
	const [count, setCount] = useState('0');
	const [firstName, setFirstName] = useState('');
	const [emptyList, setEmptyList] = useState(
		'You have not yet added any medications. Click the button below to begin adding your medications.'
	);

	//
	if (!count) {
		setEmptyList('');
	}
	//
	return (
		<UserContext.Provider
			value={{
				email,
				password,
				drugList,
				count,
				firstName,
				setDrugList,
				setCount,
				setFirstName,
				setEmail,
				emptyList,
				setEmptyList,
				setPassword,
			}}>
			{children}
		</UserContext.Provider>
	);
};
