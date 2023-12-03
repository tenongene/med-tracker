import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [uid, setUid] = useState('');
	const [drugList, setDrugList] = useState();
	const [count, setCount] = useState('0');
	const [firstName, setFirstName] = useState('');
	const [emptyList, setEmptyList] = useState(
		'You have not yet added any medications. Click the button below to begin adding your medications.'
	);
	const [drugName, setDrugName] = useState('');
	const [drugStrength, setDrugStrength] = useState('');
	const [strengthUnit, setStrengthUnit] = useState('');
	const [directions, setDirections] = useState('');
	const [refillsLeft, setRefillsLeft] = useState('');
	const [indication, setIndication] = useState('');

	return (
		<UserContext.Provider
			value={{
				email,
				password,
				drugList,
				count,
				firstName,
				drugName,
				drugStrength,
				strengthUnit,
				directions,
				refillsLeft,
				indication,
				uid,
				setDrugList,
				setUid,
				setCount,
				setFirstName,
				setEmail,
				emptyList,
				setEmptyList,
				setPassword,
				setDrugName,
				setDrugStrength,
				setStrengthUnit,
				setDirections,
				setRefillsLeft,
				setIndication,
			}}>
			{children}
		</UserContext.Provider>
	);
};
