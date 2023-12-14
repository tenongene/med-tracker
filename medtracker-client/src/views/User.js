import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Login } from './Login';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import DrugCard from '../components/DrugCard';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export const User = () => {
	//
	const { drugList, accessToken, setAccessToken } = useContext(UserContext);
	//
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		setAccessToken(accessToken);
	});

	return (
		<>
			{accessToken ? (
				<div className="interface">
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
					<Footer />
				</div>
			) : (
				<Login />
			)}
		</>
	);
};
