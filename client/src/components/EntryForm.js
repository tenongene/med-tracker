import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { uid } from 'uid';

const _ = require('lodash');

const EntryForm = ({ id }) => {
	////

	const {
		email,
		drugName,
		drugStrength,
		strengthUnit,
		directions,
		refillsLeft,
		indication,
		setDrugName,
		setDrugStrength,
		setStrengthUnit,
		setDirections,
		setRefillsLeft,
		setIndication,
	} = useContext(UserContext);

	const handleSubmit = () => {
		const newDrug = [
			{
				drugName: _.capitalize(drugName),
				strengthUnit: _.lowerCase(strengthUnit),
				directions: _.capitalize(directions),
				drugStrength: drugStrength,
				refillsLeft: refillsLeft,
				drugInfo: _.capitalize(indication),
				drugId: uid(5),
			},
		];

		axios
			.patch('/api/user', { newDrug, email })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});

		setDrugName('');
		setDirections('');
		setDrugStrength('');
		setRefillsLeft('');
		setStrengthUnit('');
		setIndication('');
	};

	return (
		<div>
			<div className="collapse" id={id}>
				<div className="card card-body">
					<form>
						<div className="mb-3 ">
							<label htmlFor="drug-name" className="form-label">
								Drug Name
							</label>
							<input
								type="text"
								className="form-control"
								id="drug-name"
								value={drugName}
								onChange={(e) => {
									setDrugName(e.target.value);
								}}
							/>
						</div>
						<div className="row">
							<div className="col mb-3">
								<label htmlFor="drug-strength" className="form-label">
									Strength
								</label>
								<input
									type="text"
									className="form-control"
									id="drug-strength"
									value={drugStrength}
									onChange={(e) => {
										setDrugStrength(e.target.value);
									}}
								/>
							</div>
							<div className="col mb-3">
								<label htmlFor="unit" className="form-label">
									Unit
								</label>
								<input
									type="text"
									className="form-control"
									id="unit"
									value={strengthUnit}
									onChange={(e) => {
										setStrengthUnit(e.target.value);
									}}
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="directions" className="form-label">
								Directions
							</label>
							<input
								type="text"
								className="form-control"
								id="directions"
								value={directions}
								onChange={(e) => {
									setDirections(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="refills" className="form-label">
								Refills
							</label>
							<input
								type="text"
								className="form-control"
								id="refills"
								value={refillsLeft}
								onChange={(e) => {
									setRefillsLeft(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="indication" className="form-label">
								Indication
								<i
									className="bi bi-info-circle ms-2"
									data-bs-placement="top"
									title="What is this medication treating?"></i>
							</label>
							<input
								type="text"
								className="form-control"
								id="indication"
								value={indication}
								onChange={(e) => {
									setIndication(e.target.value);
								}}
							/>
						</div>

						<a href="/user/">
							<button type="submit" className="btn btn-success" onClick={handleSubmit}>
								Submit
								<img src="../send-ico.svg" alt="enter" className="ms-2" />
							</button>
						</a>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EntryForm;
