import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { uid as drugId } from 'uid';

const _ = require('lodash');

const capitalizer = (input, indices) => {
	input = input.split(' ');
	input = input.map((word) => (word.length <= indices ? word.toUpperCase() : _.capitalize(word)));
	input = input.join(' ');
	return input;
};

const EntryForm = ({ id }) => {
	////

	const {
		email,
		drugName,
		setCount,
		drugStrength,
		strengthUnit,
		directions,
		refillsLeft,
		indication,
		setDrugName,
		setDrugList,
		setDrugStrength,
		setStrengthUnit,
		setDirections,
		setRefillsLeft,
		setIndication,
	} = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//
		const newDrug = [
			{
				drugName: capitalizer(drugName, 2),
				strengthUnit: strengthUnit,
				directions: _.capitalize(directions),
				drugStrength: drugStrength,
				refillsLeft: refillsLeft,
				drugInfo: capitalizer(indication, 4),
				drugId: drugId(5),
			},
		];

		await axios
			.patch('/user/add', { newDrug, email })
			.then((response) => {
				setDrugList(response.data.response.Attributes.drugList);
				setCount(response.data.response.Attributes.drugList.length);
				console.log(response);
				return response;
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

		const toggleEntry = document.querySelector('#drugEntry');
		toggleEntry.classList.toggle('show');
	};

	return (
		<div>
			<div className="collapse" id={id}>
				<div className="card card-body">
					<form onSubmit={handleSubmit}>
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
								required
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
									required
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
								required
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
								required
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
								required
							/>
						</div>
						<button type="submit" className="btn btn-success">
							Submit
							<img src="../send-ico.svg" alt="enter" className="ms-2" />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EntryForm;
